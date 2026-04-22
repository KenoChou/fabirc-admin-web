export interface OrderUpdateRequest {
  orderId: string;
  status: string;
  remark?: string;
}
