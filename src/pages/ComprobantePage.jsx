import React, { act, useContext, useEffect, useState } from "react";
import { getUser, updateProfile } from "../api/login.api";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";





const ComprobantePage = () => {

    const { recibir, totalCarrito, carrito, vaciarCarrito1, dinero, setDinero } = useContext(CartContext)

    const [total, setTotal] = useState(0)

    if (carrito.length > 0) {
        vaciarCarrito1()
    }

    const navigate = useNavigate()

    const [userData, setUserData] = useState([]);


    useEffect(() => {
        async function solicitarPerfil() {
          const res = await getUser()
          console.log(res.data)
          setUserData(res.data)
          setTotal(totalCarrito())
        }
        solicitarPerfil()
        if (dinero > 0) { async function actualizarPerfil() {
            const elDinero = {coins: dinero}
            const res = await updateProfile(elDinero);
            try {  
              if (res) {
                setDinero(0)
                }
              } catch (error) {
                console.error('Error al actualizar:', error);
        }}
        actualizarPerfil()}
      }, [])

    return (
        <>
    
    <div className="text-black flex flex-wrap w-1/4 xs:min-w-[325px] diminuto:min-w-[425px] peque:min-w-[520px] mt-[55px] p-2 max-h-[340px]">
    { recibir ? <h2 className="w-full text-xl diminuto:text-2xl peque:text-3xl font-bold flex items-center justify-center text-center diminuto:my-2 peque:my-3">Tu compra se ha realizado con éxito</h2> : 
    <h2 className="w-full text-center flex items-center justify-center text-xl diminuto:text-2xl peque:3xl text-red-500 diminuto:my-2 peque:my-3">Sin comprobante de compra</h2>}
            <div className="flex w-full flex-wrap my-2">
                <div className="flex w-full my-2">
                    <div className="tabla font-semibold">Cliente:</div>
                    <div className="tabla w-1/4"> → </div>
                    <div className="tabla w-1/2">{userData.first_name} {userData.last_name}</div>
                </div>
                <div className="flex w-full my-2">
                    <div className="tabla font-semibold">Email:</div>
                    <div className="tabla w-1/4"> → </div>
                    <div className="tabla w-1/2">{userData.email}</div>
                </div>
                <div className="flex w-full my-2">
                    <div className="tabla font-semibold">Total de compra:</div>
                    <div className="tabla w-1/4"> → </div>
                    <div className="tabla w-1/2">{total} MMC</div>
                </div>
                <div className="flex w-full my-2">
                    <div className="tabla font-semibold">Método de pago utilizado:</div>
                    <div className="tabla w-1/4"> → </div>
                    <div className="tabla w-1/2">MMC</div>
                </div>
                <div className="flex w-full my-2">
                    <div className="tabla font-semibold">Recibirás en:</div>
                    <div className="tabla w-1/4"> → </div>
                    <div className="tabla w-1/2">{recibir}</div>
                </div>
            </div> 
        </div>
        <div onClick={() => navigate('/login/productos')} className="w-full xs:mt-6 peque:mt-12 flex justify-center items-center underline xs:text-base peque:text-lg cursor-pointer">Volver al Inicio</div>
        </>
    )
}

export default ComprobantePage