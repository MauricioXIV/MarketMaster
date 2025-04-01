import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CartWidget from "./CartWidget";
import { getUser } from "../api/login.api";

function Navigation() {

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
      }, [])


    return (
        <div className="w-full border-b-8 text-sm flex flex-wrap items-center border-[#0077B6]  shadow-xl shadow-slate-500 justify-between rounded-lg bg-[#0077B6] text-white text-outline sm:justify-center md:justify-center">
        <h1 className="font-bold text-xl xs:w-full sm:w-full h-auto md:w-full lg:w-[48%] mb-4 ml-4 sm:self-center md:self-center md:text-center md:mb-0 md:ml-0 lg:text-left sm:mb-0 sm:ml-0 sm:text-center xs:text-center xs:ml-0 xs:mb-0">Market Master</h1>
        <div className="lg:w-1/2 xs:w-full md:w-full">
            <div className="flex flex-wrap justify-self-end mt-3 text-white font-roboto rounded-md font-bold md:justify-center sm:justify-center">
                <Link to="/login/nosotros" className="sm:w-1/4 md:w-1/6 lg:w-1/6 min-w-[105px] shadow-lg border-2 sm:h-auto md:h-auto lg:h-auto max-h-[25px] text-center mr-3 border-y-gray-900 lg:mt-4 xs:mt-4">Nosotros</Link>
                <Link to="/login/productos" className="sm:w-1/4 md:w-1/6 lg:w-1/6 min-w-[105px] shadow-lg border-2 sm:h-auto md:h-auto lg:h-auto max-h-[25px] text-center mr-3 border-y-gray-900 lg:mt-4 xs:mt-4">Inicio</Link>
                <Link to="/login/productos/hogar" className="sm:w-1/4 md:w-1/6 lg:w-1/6 min-w-[105px] shadow-lg border-2 sm:h-auto md:h-auto lg:h-auto max-h-[25px] text-center mr-3 border-y-gray-900 md:mt-4 lg:mt-4 xs:mt-4 sm:mt-4">Para el hogar</Link>
                <Link to="/login/productos/tecnologia" className="xs:mt-4 sm:w-1/4 md:w-1/6 lg:w-1/6 min-w-[105px] sm:mt-2 shadow-lg border-2 sm:h-auto md:h-auto lg:h-auto max-h-[25px] text-center mr-3 border-y-gray-900 md:mt-4 lg:mt-4">Tecnología</Link>
                <Link to="/login/productos/outfit" className="xs:mt-4 sm:w-1/4 md:w-1/6 lg:w-1/6 min-w-[105px] sm:mt-2 shadow-lg border-2 sm:h-auto md:h-auto lg:h-auto max-h-[25px] sm:mr-3 text-center border-y-gray-900 lg:mt-4 md:mt-4 xl:mt-4">Outfit</Link>
                <div className="flex flex-wrap justify-between mr-20 mt-6 md:justify-center md:mr-0 sm:justify-center sm:mr-0 xs:justify-center sm:w-full">
                <Link to="/login/perfil" className="sm:w-1/4 md:w-1/6 lg:w-1/6 min-w-[105px] shadow-lg border-2 sm:h-auto md:h-auto lg:h-auto max-h-[25px] text-center mr-3 border-y-gray-900 sm:mt-2 md:mt-0 xs:mt-4">Mi perfil</Link>
                <Link to="/login" className="sm:w-1/4 md:w-1/6 lg:w-1/6 min-w-[105px] shadow-lg border-2 sm:h-auto md:h-auto lg:h-auto max-h-[25px] text-center mr-3 border-y-gray-900 sm:mt-2 lg:mt-0 md:mt-0 xs:mt-4">Cerrar sesión</Link>
                <CartWidget className="sm:w-1/4 md:w-1/6 lg:w-1/6 min-w-[105px] shadow-lg border-2 sm:h-auto md:h-auto lg:h-auto max-h-[25px] text-center mr-3 border-y-gray-900" />
                <Link to="/compras" className="sm:w-1/4 md:w-1/6 lg:w-1/6 min-w-[105px] shadow-lg border-2 sm:h-auto md:h-auto lg:h-auto max-h-[25px] text-center border-y-gray-900 xs:mt-4 md:mt-0">Mis compras</Link>
                </div>
            </div>
        </div>
        <div className="w-full md:justify-center lg:justify-normal flex">
        <h1 className="font-bold text-lg w-full min-w-[105px] mb-2 ml-4 md:mt-2 sm:mt-8 md:text-center lg:text-left sm:text-center xs:text-center">¡Bienvenido a la tienda online no. 1 en el mundo, {userData.first_name}!</h1>
        </div>
        </div>
    )
}

export default Navigation
