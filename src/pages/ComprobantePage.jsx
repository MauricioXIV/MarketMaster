import React, { act, useContext, useEffect, useState } from "react";
import { getUser, updateProfile } from "../api/login.api";
import { CartContext } from "../context/CartContext";





const ComprobantePage = () => {

    const { recibir, totalCarrito, carrito, vaciarCarrito1, dinero, setDinero } = useContext(CartContext)

    const [total, setTotal] = useState(0)

    if (carrito.length > 0) {
        vaciarCarrito1()
    }

    const [userData, setUserData] = useState({
        first_name: 'None',
        last_name: '',
        email: 'None',
        coins: '0',
      });


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
                alert('MM coins actualizados correctamente');
                setDinero(0)
                }
              } catch (error) {
                console.error('Error al actualizar:', error);
                alert('Error al actualizar el perfil');
        }}
        actualizarPerfil()}
      }, [])

      console.log(total)

    return (
    
    <div className="text-black font-semibold flex flex-wrap border-4 border-slate-300 shadow-xl shadow-slate-400 rounded-lg w-1/4 min-w-[325px] mt-8  bg-slate-50">
    { recibir ? <h2 className="w-full text-center border-2 text-3xl text-lime-500">Tu compra se ha realizado con éxito</h2> : <h2 className="w-full text-center border-2 text-3xl text-red-500">Sin comprobante de compra</h2>}
            <div className="flex w-full flex-wrap">
                <div className="flex w-full">
                    <div className="w-1/5 border-2">Nombre:</div>
                    <div className="w-4/5 text-center border-2">{userData.first_name} {userData.last_name}</div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 border-2">Email:</div>
                    <div className="w-4/5 text-center border-2">{userData.email}</div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 border-2">Total de compra:</div>
                    <div className="w-4/5 text-center border-2">{total}</div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 border-2">Método de pago utilizado:</div>
                    <div className="w-4/5 text-center border-2">MM Coin</div>
                </div>
                <div className="flex w-full">
                    <div className="w-1/5 border-2">Recibirás en:</div>
                    <div className="w-4/5 text-center border-2">{recibir}</div>
                </div>
            </div> 
        </div>
    )
}

export default ComprobantePage