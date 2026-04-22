export interface ReserveRequest {
  hostId: string;
  orderId: string;
  reason: string;
}

export interface ReleaseRequest {
  reserveId: string;
  reason: string;
}
