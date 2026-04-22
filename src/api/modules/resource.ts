import { http } from '../http';
import type { ApiResponse } from '../../types/common';
import type { HostItem, MonitorPoint, MonitorRequest, ResourceListRequest } from '../../types/resource';

export const fetchHostListApi = async (payload: ResourceListRequest): Promise<HostItem[]> => {
  const { data } = await http.post<ApiResponse<HostItem[]>>('/api/v1/compute/resource/host/collect', payload);
  return data.data;
};

export const fetchHostMonitorApi = async (payload: MonitorRequest): Promise<MonitorPoint[]> => {
  const { data } = await http.post<ApiResponse<MonitorPoint[]>>('/api/v1/compute/resource/host/monitor/collect', payload);
  return data.data;
};
