import type { User } from '@/types/response.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth_slice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => { state.user = action.payload },
    clearUser: (state) => { state.user = null }
  },
});

export default authSlice;
