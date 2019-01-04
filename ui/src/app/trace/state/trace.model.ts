export interface Traceable {
  id: string;
  name: string;
  description: string;

  owner?: string;
  holder: string;

  transfers: string[];
}

export interface Transfer {
  id: string;
  sender: string;
  receiver: string;
  state: TransferState;

  timestamp?: number;

  traceableId: string;

  observations: string;
}

export enum TransferState {
  AWAITING_CONFIRMATION,
  PENDING_ANSWER,
  COMPLETED
}
