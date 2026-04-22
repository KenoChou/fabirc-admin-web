import { http } from '../http';
import type { LoginRequest, LoginResponse } from '../../types/auth';
import type { ApiResponse } from '../../types/common';

export const loginApi = async (payload: LoginRequest): Promise<LoginResponse> => {
  const { data } = await http.post<ApiResponse<LoginResponse>>('/api/v1/authentication/token', payload);
  return data.data;
};
