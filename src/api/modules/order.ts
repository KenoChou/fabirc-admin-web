import { http } from '../http';
import type { ApiResponse } from '../../types/common';
import type { OrderUpdateRequest } from '../../types/order';

export const updateOrderStatusApi = async (payload: OrderUpdateRequest): Promise<string> => {
  const { data } = await http.post<ApiResponse<string>>('/api/v1/compute/resource/host/order/update', payload);
  return data.data;
};
