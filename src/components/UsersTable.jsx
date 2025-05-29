import React, { useContext, useEffect, useState } from "react";
import login, { getAllUsers } from "../api/login.api";
import Users from "./Users";
import { useForm } from 'react-hook-form'
import { data, Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/refreshToken"
import logo from "../images/carroama.jpg"
import { CartContext } from "../context/CartContext";
import cada from "../images/cada.png"
import Animacion from "../videos/VideoCart";

const UsersTable = () => {

    const { vaciarCarrito } = useContext(CartContext)

    const {register, handleSubmit, formState: {errors}} = useForm()

    const [res, setRes] = useState("")

    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
        const res = await login(data.email, data.password)
        setRes(res)
        if (res === true) {
            window.location.href = "/login/productos"
        }
    })

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
        logoutUser()
        vaciarCarrito()
        }
    },[])

    return (
        <>
        <div className="xs:hidden sm:flex sm:w-1/3 
        sm:h-1/3 sm:min-h-[250px]
        md:min-h-[300px] larguito:min-h-[350px] sm:ml-4 sm:rounded-lg
        md:ml-14 lg:ml-24">
        <div className="flex w-full justify-evenly text-center 
            items-center
            ">
                <Animacion />
        </div>
        </div>
        <div className="text-black flex items-center 
        justify-center flex-wrap border-gray-300 shadow-lg  
        border-2 xs:w-1/3 xs:min-w-[300px] 
        peque:min-w-[350px] xs:my-16 peque:mt-10 sm:m-0
        sm:w-1/2 sm:h-1/3 sm:rounded-lg md:w-2/5 md:mr-4
        larguito:h-2/3 lg:mr-10" >
            <div className="flex w-full justify-evenly text-center 
            items-center xs:pt-2 sm:hidden">
                <Animacion />
            </div>
            <div className="xs:hidden sm:flex sm:w-full sm:justify-center 
            sm:items-center sm:pt-1 sm:font-mono sm:text-lg 
            larguito:text-3xl larguito:flex larguito:flex-wrap larguito:pt-6
            larguito:px-2 xl:text-4xl lg:px-3" >Tu tienda online de <b className="pl-1 larguito:pl-2 lg:pl-3">confianza</b></div>
            <form onSubmit={onSubmit} className="flex flex-wrap">
                <div className="w-full h-full mt-4 sm:mt-0">
                <input
                className="bg-zinc-300 peque:p-1 larguito:p-2 lg:p-3 xl:p-4 rounded-lg block my-2 mx-auto xs:w-5/6 xs:h-1/2"
                type="text"
                placeholder="email"
                {...register("email", {required: true})}
                />
                {errors.email && <div className="w-full text-center text-red-600">This field is required</div>}
                <input
                className="bg-zinc-300 peque:p-1 larguito:p-2 lg:p-3 xl:p-4 rounded-lg block my-2 mx-auto xs:w-5/6 xs:h-1/2"
                type="password"
                placeholder="password"
                {...register("password", {required: true})}
                />
                {errors.password && <div className="w-full text-center text-red-600">This field is required</div>}
                </div>
                <button
                className="bg-white xs:p-1 larguito:p-2 lg:p-3 xl:p-4 xl:text-lg rounded-lg block xs:w-full my-3
                 border-e-gray-300 border-2 shadow-lg font-bold">
                Login</button>
                {
                    res === false &&
                    <div className="text-red-700 w-full text-center">
                        Usuario o contraseña incorrectos.
                    </div>
                }
                </form>
                <div className="text-black w-full text-center mb-2 larguito:text-xl xl:text-2xl">
                    <Link to="/register/">¿No tienes cuenta? <b>Regístrate </b></Link>
                </div>
        </div>
        </>
    )
}

export default UsersTable