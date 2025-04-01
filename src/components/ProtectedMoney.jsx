import { useContext, useEffect } from 'react';
import { useNavigate, Outlet, replace } from 'react-router-dom';
import { getUser } from '../api/login.api';
import { CartContext } from '../context/CartContext';

const ProtectedMoney = ( { children }) => {
  const navigate = useNavigate();

  const { totalCarrito } = useContext(CartContext)

  useEffect(() => {
      async function solicitarPerfil() {
        const res = await getUser()
        console.log(res.data)
        if (res.data.coins < totalCarrito()) {
          window.alert("No tienes suficientes MP Coins")
          return navigate('/login/perfil', { replace: true });
        }
      }
      solicitarPerfil()
    }, [])

  return children 
};

export default ProtectedMoney;