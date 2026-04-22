import { ROLE } from '../constants';

export type UserRole = (typeof ROLE)[keyof typeof ROLE];

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  role: UserRole;
  username: string;
}
