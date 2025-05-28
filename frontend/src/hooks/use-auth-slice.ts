import type { User } from '@/types/response.types';
import { useAppDispatch } from '@hooks/redux-hooks';
import authSlice from '@redux/auth/auth-slice';

export default function useAuthSlide() {
  const { setUser, clearUser } = authSlice.actions;
  const dispatch = useAppDispatch();

  return {
    setUser: (user: User | null) => dispatch(setUser(user)),
    clearUser: () => dispatch(clearUser()),
  }
}