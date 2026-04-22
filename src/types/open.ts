export interface HostOpenRequest {
  hostId: string;
  orderId: string;
  operator: string;
}

export interface OpenQueryRequest {
  orderId: string;
}

export interface OpenQueryItem {
  orderId: string;
  hostId: string;
  status: string;
  updatedAt: string;
}
