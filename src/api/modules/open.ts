import { http } from '../http';
import type { ApiResponse } from '../../types/common';
import type { HostOpenRequest, OpenQueryItem, OpenQueryRequest } from '../../types/open';

export const hostOpenApi = async (payload: HostOpenRequest): Promise<string> => {
  const { data } = await http.post<ApiResponse<string>>('/api/v1/compute/resource/host/open', payload);
  return data.data;
};

export const hostOpenQueryApi = async (payload: OpenQueryRequest): Promise<OpenQueryItem[]> => {
  const { data } = await http.post<ApiResponse<OpenQueryItem[]>>('/api/v1/compute/resource/host/open/query', payload);
  return data.data;
};
