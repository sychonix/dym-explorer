import config from '@app/config'
import { logger } from '@app/logger'
import { KafkaStreamer, KafkaStreamerOpts } from '@app/server/core/streams'
import { EthVMServer } from '@app/server/ethvm-server'
import { BlocksServiceImpl, MockBlockRepository } from '@app/server/modules/blocks'
import { ChartsServiceImpl, MockChartsRepository } from '@app/server/modules/charts'
import { MockExchangeServiceImpl } from '@app/server/modules/exchanges'
import { MockTxsRepository, TxsServiceImpl } from '@app/server/modules/txs'
import { RedisTrieDb, VmEngine, VmRunner, VmServiceImpl } from '@app/server/modules/vm'
import { RedisCacheRepository } from '@app/server/repositories'
import * as EventEmitter from 'eventemitter3'

async function bootstrapServer() {
  logger.debug('bootstrapper -> Bootstraping ethvm-socket-server!')

  // Create TrieDB
  logger.debug('bootstrapper -> Initializing TrieDB')
  const trieOpts = {
    host: config.get('eth.trie_db.redis.host'),
    port: config.get('eth.trie_db.redis.port'),
    db: config.get('eth.trie_db.redis.db'),
    rpcHost: config.get('eth.rpc.host'),
    rpcPort: config.get('eth.rpc.port')
  }
  const trieDb = new RedisTrieDb(trieOpts)

  // Create VmEngine
  logger.debug('bootstrapper -> Initializing VmEngine')
  const vmeOpts = {
    rpcUrl: config.get('eth.vm.engine.rpc_url'),
    tokensAddress: config.get('eth.vm.engine.tokens_smart_contract'),
    account: config.get('eth.vm.engine.account')
  }
  const vme = new VmEngine(vmeOpts)

  // Create VmRunner
  logger.debug('bootstrapper -> Initializing VmRunner')
  const gasLimit = config.get('eth.vm.engine.gas_limit')
  const vmr = new VmRunner(trieDb, gasLimit)

  // Create Cache data store
  logger.info('bootstrapper -> Initializing redis cache data store')
  const redisDsOpts = {
    host: config.get('data_stores.redis.host'),
    port: config.get('data_stores.redis.port'),
    db: config.get('data_stores.redis.db'),
    socketRows: config.get('data_stores.redis.socket_rows')
  }
  const ds = new RedisCacheRepository(redisDsOpts)
  await ds.initialize().catch(() => process.exit(-1))

  // Set default state block to VmRunner
  const blocks = await ds.getBlocks()
  const configStateRoot = config.get('eth.state_root')
  const hasStateRoot = blocks && blocks[0] && blocks[0].stateRoot
  const stateRoot = hasStateRoot ? Buffer.from(blocks[0].stateRoot!!) : Buffer.from(configStateRoot, 'hex')
  vmr.setStateRoot(stateRoot)

  // Create block event emmiter
  logger.debug('bootstrapper -> Initializing event emitter')
  const emitter = new EventEmitter()

  // Create services
  // ---------------

  // Blocks
  const blocksRepository = new MockBlockRepository()
  const blockService = new BlocksServiceImpl(blocksRepository, ds)

  // Txs
  const txsRepository = new MockTxsRepository()
  const txsService = new TxsServiceImpl(txsRepository, ds)

  // Charts
  const chartsRepository = new MockChartsRepository()
  const chartsService = new ChartsServiceImpl(chartsRepository)

  // Exchanges
  const exchangeService = new MockExchangeServiceImpl()

  // Vm
  const vmService = new VmServiceImpl(vme, vmr)

  // Create streamer
  // ---------------
  logger.debug('bootstrapper -> Initializing streamer')
  const kafkaStreamerOpts: KafkaStreamerOpts = {
    groupId: config.get('streamer.kafka.group_id'),
    brokers: config.get('streamer.kafka.brokers'),
    blocksTopic: config.get('streamer.kafka.topics.blocks'),
    pendingTxsTopic: config.get('streamer.kafka.topics.pending_txs')
  }
  const streamer = new KafkaStreamer(kafkaStreamerOpts, emitter)
  await streamer.initialize()

  // Create server
  logger.debug('bootstrapper -> Initializing server')
  const blockTime: number = config.get('eth.block_time')
  const server = new EthVMServer(blockService, txsService, chartsService, exchangeService, vmService, streamer, ds, blockTime)
  await server.start()
}

bootstrapServer()
