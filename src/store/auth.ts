import { create } from 'zustand';
import { ROLE, STORAGE_KEYS } from '../constants';
import type { UserRole } from '../types/auth';

interface AuthState {
  token: string;
  username: string;
  role: UserRole;
  setAuth: (payload: { token: string; username: string; role: UserRole }) => void;
  clearAuth: () => void;
}

const defaultRole: UserRole = ROLE.normal;

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(STORAGE_KEYS.token) ?? '',
  username: localStorage.getItem(STORAGE_KEYS.username) ?? '',
  role: (localStorage.getItem(STORAGE_KEYS.role) as UserRole) ?? defaultRole,
  setAuth: ({ token, username, role }) => {
    localStorage.setItem(STORAGE_KEYS.token, token);
    localStorage.setItem(STORAGE_KEYS.username, username);
    localStorage.setItem(STORAGE_KEYS.role, role);
    set({ token, username, role });
  },
  clearAuth: () => {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.username);
    localStorage.removeItem(STORAGE_KEYS.role);
    set({ token: '', username: '', role: defaultRole });
  },
}));
