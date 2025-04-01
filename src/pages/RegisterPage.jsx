import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addUser } from "../api/login.api";
import logo from "../images/carrote.jpg"
import lago from "../images/registro.jpg"

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
        <div className="flex flex-wrap w-full h-1/2 justify-center">
            <div className="w-full border border-b-4 text-2xl flex flex-wrap items-center border-e-gray-300  shadow-xl justify-between xs:justify-center lg:justify-between">
                    <p className="pl-6 font-mono lg:w-[27%] md:w-[35%] sm:w-[40%] xs:w-full">Bienvenido a Market Master. Tu tienda online de <b>confianza</b></p>
                    <img src={logo} className="h-32 w-32 mr-28 xs:w-full xs:mr-0 max-w-[200px] lg:mr-12"/>
                    </div>
        <div className="text-black flex items-center justify-center flex-wrap border-e-gray-300 shadow-2xl border-solid border-4 w-1/3 min-w-[350px] h-1/2 mt-16 mb-14">
            <div className="w-full text-center text-3xl font-bold font-sans p-5">Registrate</div>
            <div className=" flex w-full justify-center">
                <img src={lago} className=" w-2/3 h-2/3" />
            </div>
            <form onSubmit={onSubmit} className="flex flex-wrap">
                <div className="w-full h-full">
                <input
                className="bg-zinc-300 p3 rounded-lg block mb-3 mx-auto w-full"
                type="text"
                placeholder="First name"
                {...register("first_name", {required: true})}
                />
                <input
                className="bg-zinc-300 p3 rounded-lg block mb-3 mx-auto w-full"
                type="text"
                placeholder="last_name"
                {...register("last_name", {required: true})}
                />
                <input
                className="bg-zinc-300 p3 rounded-lg flex my-2 mx-auto w-full"
                type="text"
                placeholder="email"
                {...register("email", {required: true})}
                />
                {errors.email && <div className="text-red-700 w-full text-center">This field is required</div>}
                {!respuesta === 200 && <div className="text-red-700 w-full text-center">Email actualmente en uso. Prueba con otro</div>}
                <input
                className="bg-zinc-300 p3 rounded-lg block my-2 mx-auto w-full"
                type="password"
                placeholder="password"
                {...register("password", {required: true})}
                /></div>
                {errors.password && <div className="text-red-700 w-full text-center">This field is required</div>}
                <div className="flex justify-center w-full">
                <button
                className="bg-white p3 rounded-lg block w-1/3 mt-9 border-e-gray-300 border-solid border-4 shadow-gray-500 shadow-lg mb-5">
                Sign in</button></div>
                </form>
        </div>
        </div>
    )
}

export default RegisterPage