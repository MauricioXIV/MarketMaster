import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import CartWidget from "./CartWidget";
import { getUser } from "../api/login.api";
import { Search } from "lucide-react";
import carreto from  "../images/carreto.png"
import { CartContext } from "../context/CartContext";
import axios from "axios";
import { logoutUser } from "../api/refreshToken";
import { set } from "react-hook-form";

function Navigation() {

    const navigate = useNavigate()

    const inputRef = useRef(null);

    const [userData, setUserData] = useState({
        first_name: 'Juan',
        last_name: 'Pérez García',
        email: 'juan.perez@example.com',
        coins: Math.floor(Math.random() * 1000),
        image: 'https://randomuser.me/api/portraits/men/75.jpg'
      });
    
    useEffect(() => {
        async function solicitarPerfil() {
          const res = await getUser()
          setUserData(res.data)
        }
        solicitarPerfil()
      },[])

      const [query, setQuery] = useState("");
      const { setResultados, setEvito, setPam } = useContext(CartContext)


const handleSearchClick = async () => {
  const value = inputRef.current.value;
  if (value.length > 2) {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/productos/set/productos/search/?q=${value}`, {
        withCredentials: true,
      });
      setResultados(data.productos);
      navigate('/login/productos');
      inputRef.current.value = ""; 
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  }
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleSearchClick();
  }
};

    return (
          <nav className="navbar bg-[#0077B6]">
            <div className="xs:w-full flex flex-wrap">
              <div className="xs:w-1/12 flex items-center justify-end pr-1"><Search onClick={handleSearchClick} className="text-white-500 xs:w-4 xs:h-4 cursor-pointer" /></div>
                <input
                type="text"
                placeholder="Buscar productos..."
                ref={inputRef}
                onKeyDown={handleKeyDown}
                className="rounded-lg border-2 border-gray-500 xs:w-3/4 diminuto:w-1/2 larguito:w-1/6 text-black pl-1 cursor-pointer"
            />
            <div className="xs:hidden larguito:flex larguito:w-2/3 larguito:justify-center">
              <div onClick={() => {navigate('/login/productos') 
                                            setResultados([])}} 
              className="puntonav">Inicio</div>
              <div onClick={() => {navigate('/login/productos/hogar')
                                            setResultados([])}} 
              className="puntonav">Hogar</div>
              <div onClick={() => {navigate('/login/productos/tecnologia')
                                            setResultados([])}} 
              className="puntonav">Tecnología</div>
              <div onClick={() => {navigate('/login/productos/outfit')
                                            setResultados([])}} 
              className="puntonav">Outfit</div>
              <div onClick={() => {navigate('/login/perfil')
                                            setResultados([])}} 
              className="puntonav">Perfil</div>
              <div onClick={() => {navigate('/compras')
                                            setResultados([])}} 
              className="puntonav">Compras</div>
              <div onClick={() => logoutUser()} className="puntonav">Cerrar sesión</div>
            </div>
            <div onClick={() => navigate("/login/carrito")} className="xs:w-1/6 diminuto:w-5/12 larguito:w-1/12 flex justify-center cursor-pointer"><img src={carreto} alt="carrito" className="xs:h-5 xs:w-5" /></div>
            </div>
            </nav>
    )
}

export default Navigation
