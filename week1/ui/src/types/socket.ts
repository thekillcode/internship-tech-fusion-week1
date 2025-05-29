export interface SocketMessage {
  event: string;
  data: unknown;
}

export interface SocketConfig {
  url: string;
  options?: {
    transports?: Array<'websocket' | 'polling'>;
    [key: string]: unknown;
  };
}