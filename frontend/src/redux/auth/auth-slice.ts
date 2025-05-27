import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: object | null;
}

const initialState = {
  user: null,
} satisfies AuthState;

const authSlice = createSlice({
  name: 'auth_slice',
  initialState,
  reducers: {}
})

export default authSlice;