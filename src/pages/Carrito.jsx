import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import loguito from "../images/elcora.png"
import { getUser } from "../api/login.api";
import flecha from "../images/flecha.png"
import x from "../images/x.png"

const Carrito = () => {

    const { carrito, vaciarCarrito, totalCarrito, eliminarDelCarrito } = useContext(CartContext)

    function capitalizeFirstLetter(str) {
        if (!str) return ''
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleVaciar = () => {
        vaciarCarrito()
    }

    const navigate = useNavigate()

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

    console.log(carrito)
    const envergadura = carrito.length


    return (
        <div className="flex flex-col items-center peque:max-w-[520px]">
        <>
        <div className={`xs:w-full ${carrito.length > 0 ? "bg-gray-300" : "bg-[#f8f9fa]"} mt-[55px] flex flex-wrap p-2 justify-center min-w-[200px] max-w-[520px]`}>
            <div className="w-full flex mb-2 items-center cursor-pointer"><img onClick={() => navigate(-1)} src={flecha} alt="back" className="xs:w-7 xs:h-7" ></img></div>
        {
            carrito.map((prod) => (
                <div className="w-1/6 xs:min-w-[120px] bg-white flex-wrap justify-center mb-3 border border-gray-400 p-1 mx-4" key={prod.id}>
                    <button onClick={() => eliminarDelCarrito(prod.id)} className="xs:w-full flex justify-end"><img src={x} alt="delete" className="xs:w-3 xs:h-3" /></button>
                    <div className="w-full flex justify-center p-1">
                        <img src={`https://backend-mm-production.up.railway.app/media/${prod.image}`} alt={prod.name} />
                    </div>
                    <div className="mb-1 xs:max-h-[28px]">
                        <h1 className="text-black font-semibold text-xs pl-2">{prod.title}</h1>
                    </div>
                    <div className="xs:text-xs pl-2 text-[#212529] my-1">{prod.description}</div>
                    <div className="xs:text-xs pl-2 text-[#14A44D]"><div>${Number(prod.price).toLocaleString("es-MX")}</div></div>
                    <div className="xs:text-xs pl-2"><div className="text-base font-medium">Cantidad: {prod.cantidad}</div></div>
                </div>
            ))
        } </div>
        {carrito.length < 1 &&
        <>
        <div className="flex justify-center flex-wrap">
        <div className="xs:text-2xl text-black w-full text-center xs:p-2">El carrito está vacío :( Tus compras se mostrarán aquí.</div>
        <div className="flex xs:p-2"><img src={loguito} alt="lloron" className="w-ful mt-4"></img></div>
        </div>
        </>
        } { carrito.length >= 1 &&
    <>
    <div className="flex flex-wrap mt-2 border-y-2 p-2 xs:w-full min-w-[200px] max-w-[520px]"> 
        <div className="text-sm xs:w-1/2 peque:text-base">Productos ({envergadura})</div><div className="flex xs:w-1/2 justify-end text-xs peque:text-base">$ {totalCarrito()}</div>
        <div className="text-sm xs:w-1/2 peque:text-base">Cupones (0) </div><div className="flex xs:w-1/2 justify-end text-xs peque:text-base">N/A</div>  
        <div className="text-base xs:w-1/2 font-semibold my-2 peque:text-lg">Total a pagar: </div><div className="flex xs:w-1/2 justify-end text-base peque:text-lg font-semibold">$ {totalCarrito()}</div>
        <div className="text-xs peque:text-sm xs:full font-thin my-2">MM coins disponibles: {userData.coins}</div>
        <button onClick={() => navigate("/login/compra")} disabled={Number(userData.coins) < Number(totalCarrito())} className={`w-full my-1 p-1 mx-4 rounded-md focus:outline-none 
        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm peque:text-base ${
            (Number(userData.coins) < Number(totalCarrito()))
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}>Continuar compra
        </button>
        <button onClick={handleVaciar} className="w-full my-1 p-1 mx-4 rounded-md focus:outline-none text-black
        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm peque:text-base bg-gray-400 hover:bg-gray-500">
        Vaciar Carrito
        </button>

    </div>
    </>}
        </>
        </div>
    )
}

export default Carrito