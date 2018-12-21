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
  timestamp: number;

  traceableId: string;

  observations: string;
}
