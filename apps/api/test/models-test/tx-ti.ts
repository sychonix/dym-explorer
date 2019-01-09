/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const Log = t.iface([], {
  "address": t.opt("string"),
  "topics": t.opt("Buffer"),
  "data": t.opt("Buffer"),
});

export const Trace = t.iface([], {
  "parentHash": t.opt("string"),
  "hash": t.opt("string"),
  "opcode": t.opt("string"),
  "deep": t.opt("number"),
  "index": t.opt("number"),
  "rejected": t.opt("boolean"),
  "from": t.opt("string"),
  "to": t.opt("string"),
  "value": t.opt("Buffer"),
  "data": t.opt("Buffer"),
  "gas": t.opt("number"),
  "gasPrice": t.opt("number"),
  "nonce": t.opt("Buffer"),
});

export const Tx = t.iface([], {
  "blockHash": t.opt("string"),
  "blockNumber": t.opt("number"),
  "hash": t.opt("string"),
  "timestamp": t.opt("number"),
  "index": t.opt("number"),
  "nonce": t.opt("string"),
  "from": t.opt("string"),
  "to": t.opt("string"),
  "contractAddress": t.opt("string"),
  "status": t.opt("boolean"),
  "data": t.opt("Buffer"),
  "fee": t.opt("number"),
  "logs": t.opt("Log"),
  "result": t.opt("boolean"),
  "gasPrice": t.opt("number"),
  "gasLimit": t.opt("number"),
  "gasUsed": t.opt("number"),
  "gasRefund": t.opt("number"),
  "gasLeftover": t.opt("number"),
  "traces": t.opt(t.array("Trace")),
  "v": t.opt("number"),
  "r": t.opt("number"),
  "s": t.opt("number"),
  "value": t.opt("Buffer"),
});

const exportedTypeSuite: t.ITypeSuite = {
  Log,
  Trace,
  Tx,
};
export default exportedTypeSuite;
