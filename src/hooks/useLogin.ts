import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, login, logout] = useLocalStorage('isLogin', false);
  if (!isLogin && location.pathname !== '/login') {
    navigate('/login');
  }
  return { isLogin, login, logout };
}
