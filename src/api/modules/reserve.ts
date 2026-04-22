import { http } from '../http';
import type { ApiResponse } from '../../types/common';
import type { ReleaseRequest, ReserveRequest } from '../../types/reserve';

export const reserveNotifyApi = async (payload: ReserveRequest): Promise<string> => {
  const { data } = await http.post<ApiResponse<string>>('/api/v1/compute/resource/reserve/notify', payload);
  return data.data;
};

export const reserveReleaseApi = async (payload: ReleaseRequest): Promise<string> => {
  const { data } = await http.post<ApiResponse<string>>('/api/v1/compute/resource/reserve/release', payload);
  return data.data;
};
