'use client';
import { createContext } from 'react';
import type { AuthContextType } from '@/lib/types';

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});
