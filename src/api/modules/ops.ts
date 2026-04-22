import { http } from '../http';

export interface OpsToolResponse {
  result: string;
}

export const runOpsToolApi = async (path: string, payload: Record<string, string>): Promise<OpsToolResponse> => {
  const { data } = await http.post<OpsToolResponse>(`/gpu/${path}`, payload);
  return data;
};
