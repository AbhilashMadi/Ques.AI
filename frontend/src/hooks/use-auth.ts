import { useAppSelector } from '@hooks/redux-hooks';

export default function useAuth() {
  const { user } = useAppSelector(s => s.auth_slice);

  return {
    isAuthenticated: user?.isVerified ?? null,
    user,
  }
}