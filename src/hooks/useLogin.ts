import { useNavigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setLogin, setLogOut] = useLocalStorage('isLogin', false);
  if (!isLogin && location.pathname !== '/login') {
    navigate('/login');
  }
  return { isLogin, setLogin, setLogOut };
}
