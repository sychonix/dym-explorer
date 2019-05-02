/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: txs
// ====================================================

export interface txs_txs_receipt {
  __typename: "Receipt";
  contractAddress: string | null;
  gasUsed: any | null;
  status: string | null;
}

export interface txs_txs_traces {
  __typename: "Trace";
  error: string | null;
}

export interface txs_txs {
  __typename: "Transaction";
  blockHash: string | null;
  blockNumber: any | null;
  from: string | null;
  gas: any | null;
  gasPrice: any | null;
  hash: string | null;
  input: any | null;
  timestamp: string | null;
  to: string | null;
  value: any | null;
  receipt: txs_txs_receipt | null;
  traces: (txs_txs_traces | null)[] | null;
}

export interface txs {
  txs: (txs_txs | null)[] | null;
}

export interface txsVariables {
  limit?: number | null;
  page?: number | null;
  fromBlock?: any | null;
}