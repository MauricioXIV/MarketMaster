import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/login.api";
import logo from "../images/carrote.jpg"
import cada from "../images/cada.png"
import Animacion from "../videos/VideoCart";

const RegisterPage = () => {

    const {register, handleSubmit, formState: {errors}} = useForm()

    const [respuesta, setRespuesta] = useState(0)

    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
        const res = await addUser(data)
        setRespuesta(res)
        if (res) {
            navigate("/login")
        }
    })


    return(
        <>
        <div className="flex flex-wrap justify-center w-full sm:h-screen sm:items-center 
                sm:mr-4 sm:justify-between">
                <div className="xs:w-full border border-b-2 text-2xl flex flex-wrap items-center justify-center text-center border-gray-300 shadow-lg xs:py-2 
                xs:px-3 xs:justify-center lg:justify-between sm:hidden">
                <div className="font-mono xs:w-full lg:w-[27%] md:w-[35%] sm:w-[40%]">Tu tienda online de <b>confianza</b></div>
                <img src={logo} className="h-32 w-32 mr-28 xs:w-full xs:mr-0 max-w-[200px] lg:mr-12 xs:hidden"/>
                </div>
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
        sm:w-1/2 sm:h-2/5 sm:rounded-lg md:w-2/5 md:mr-4
        larguito:h-2/3 lg:mr-10">
             <div className="flex w-full justify-evenly text-center 
            items-center xs:pt-2 sm:hidden">
                <Animacion />
            </div>
            <div className="xs:hidden sm:flex sm:w-full sm:justify-center 
            sm:items-center sm:pt-1 sm:font-mono sm:text-lg 
            larguito:text-3xl larguito:flex larguito:flex-wrap larguito:pt-6
            larguito:px-2 xl:text-4xl lg:px-3" >Tu tienda online de <b className="pl-1 larguito:pl-2 lg:pl-3">confianza</b></div>
            <form onSubmit={onSubmit} className="flex flex-wrap">
                <div className="w-full h-full">
                <input
                className="bg-zinc-300 peque:p-1 larguito:p-2 lg:p-3 xl:p-4 rounded-lg block my-2 mx-auto xs:w-5/6 xs:h-1/2"
                type="text"
                placeholder="First name"
                {...register("first_name", {required: true})}
                />
                <input
                className="bg-zinc-300 peque:p-1 larguito:p-2 lg:p-3 xl:p-4 rounded-lg block my-2 mx-auto xs:w-5/6 xs:h-1/2"
                type="text"
                placeholder="last_name"
                {...register("last_name", {required: true})}
                />
                <input
                className="bg-zinc-300 peque:p-1 larguito:p-2 lg:p-3 xl:p-4 rounded-lg block my-2 mx-auto xs:w-5/6 xs:h-1/2"
                type="text"
                placeholder="email"
                {...register("email", {required: true})}
                />
                {errors.email && <div className="text-red-700 w-full text-center">This field is required</div>}
                {!respuesta === 200 && <div className="text-red-700 w-full text-center">Email actualmente en uso. Prueba con otro</div>}
                <input
                className="bg-zinc-300 peque:p-1 larguito:p-2 lg:p-3 xl:p-4 rounded-lg block my-2 mx-auto xs:w-5/6 xs:h-1/2"
                type="password"
                placeholder="password"
                {...register("password", {required: true})}
                /></div>
                {errors.password && <div className="text-red-700 w-full text-center">This field is required</div>}
                <div className="flex justify-center w-full">
                <button
                className="bg-white xs:p-1 larguito:p-2 lg:p-3 xl:p-4 xl:text-lg rounded-lg block xs:w-full my-3
                 border-e-gray-300 border-2 shadow-lg font-bold">
                Sign in</button></div>
                </form>
        </div>
        </div>
        </>
    )
}

export default RegisterPage