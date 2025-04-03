import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import logo from "../images/corazon.png"
import { getUser } from "../api/login.api";

const Carrito = () => {

    const { carrito, vaciarCarrito, totalCarrito } = useContext(CartContext)

    function capitalizeFirstLetter(str) {
        if (!str) return ''
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const handleVaciar = () => {
        vaciarCarrito()
    }

    const navigate = useNavigate()

    const onClick = () => {
        navigate("/login/compra/")
    }

    console.log(carrito)

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
          console.log(res.data)
          setUserData(res.data)
        }
        solicitarPerfil()
      }, [])

      console.log(carrito)


    return (
        <>
        {
            carrito.map((prod) => (
                <div className="text-zinc-700 border-4 border-gray-200 w-1/4 min-w-[200px] rounded-lg bg-white flex-wrap flex-col justify-center hover:scale-110 transition-transform duration-300 shadow-md shadow-slate-600 h-1/2 hover:bg-gray-200 mt-8" key={prod.id}>
                    <div className="bg-[#0077B6] rounded-lg border-b-4 border-gray-500-600 shadow-2xl"><h1 className="text-3xl justify-self-center text-white font-semibold">{prod.title}</h1></div>
                    <div className="flex items-center justify-center w-full">  <img src={`https://backend-mm-production.up.railway.app/media/${prod.image}`} alt={prod.name} className="h-32 w-32 rounded-lg" /> </div>
                    <div className="flex items-center justify-center w-full"><div className="text-2xl">{capitalizeFirstLetter(prod.category)}</div></div>
                    <div>
                        <h2>{prod.description}</h2>
                    </div>
                    <div className="flex justify-center w-full text-[#14A44D]"><div>${Number(prod.price).toLocaleString("es-MX")}</div></div>
                    <div className="flex justify-center w-full"><div className="text-2xl">Cantidad: {prod.cantidad}</div></div>
                </div>
                
            ))
        } { carrito.length >= 1 &&
        <div className=" flex w-full justify-center">
        <button onClick={handleVaciar} className="w-1/5 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md mr-2 justify-self-center mt-5">Vaciar Carrito</button>
        </div> }
        {carrito.length < 1 &&
        <div className="flex justify-center flex-wrap">
        <div className="text-4xl text-black w-full mt-8 text-center">El carrito está vacío :( Tus compras se mostrarán aquí.</div>
        <div className="flex mb-8"><img src={logo} alt="lloron" className="w-full border border-gray-300 shadow-lg rounded-lg mt-4"></img></div>
        </div>
        } { carrito.length >= 1 &&
    <div> 
        <div className="text-3xl text-black mt-5">
        <div className="text-[#14A44D]">Total a pagar: ${totalCarrito()} </div>
        </div>
        <div>MM coins disponibles: {userData.coins}</div>
    </div> } { carrito.length >= 1 &&
    <div className="flex justify-center items-center">
        <div className=" flex flex-wrap justify-center">
        <button onClick={onClick} disabled={userData.coins < totalCarrito()} className={`w-full h-1/2 py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            (userData.coins < totalCarrito())
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
            }`}>Comprar</button>
        </div>
    </div>}
        </>
    )
}

export default Carrito