import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaGithub, FaLinkedin } from 'react-icons/fa';
import foto from "../images/caromau.jpg"
import fato from "../images/mauri.jpg"
import futo from "../images/mauadmin.jpg"
import carro from "../images/carrote.jpg"
import grupo from "../images/grupo.jpg"
import duro from "../images/duro.jpg"

const NosotrosPage = () => {
    return(
        <div className="contenedor-contacto">
            <div className="contacto">
                <p className="">Síguenos en nuestras redes sociales para enterarte de todas las novedades.
                <p className="mt-12 flex flex-col items-center">
                <a href="https://www.facebook.com/mauri.rdzballes/" target="_blank" rel="noopener noreferrer" className="mb-2 mr-12"> <FaFacebook /></a>
                <a href="https://www.youtube.com/@MauricioRodriguezBallesteros" target="_blank" rel="noopener noreferrer" className="mb-2 ml"> <FaYoutube /> </a>
                <a href="https://www.instagram.com/mauricio15ballesteros/" target="_blank" rel="noopener noreferrer" className="mb-2 ml-12"> <FaInstagram /> </a>
                <a href="https://github.com/MauricioXIV?tab=overview&from=2025-02-01&to=2025-02-18" target="_blank" rel="noopener noreferrer" className="mb-2"> <FaGithub /> </a>
                <a href="https://www.linkedin.com/in/mauricio-rodr%C3%ADguez-ballesteros-36058a343/" target="_blank" rel="noopener noreferrer" className="mr-12"> <FaLinkedin /> </a>
                <img src={grupo} alt="Foto de Mauricio Rodríguez Ballesteros" className="rounded-full w-40 h-32 mb-4 mt-4 border-2 border-gray-100 shadow-lg shadow-slate-500"/>
                </p>
                </p>
            </div>
            <div className="flex-wrap justify-center pl-16 w-full">
    <div className="contenedor-informacion justify-self-start">
        <div className="group relative w-full mb-2 font-semibold cursor-pointer">
            <p>¡Bienvenidos a Master Market!</p>
            <p className="absolute left-0 top-full bg-white shadow-lg font-normal rounded-lg opacity-0 translate-y-5 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 p-4 border-2 border-gray-200 z-10">
                Hola, soy Mauricio Rodríguez Ballesteros, fundador y CEO de 
                <span className="font-mono"> Master Market</span>, una plataforma de comercio electrónico 
                creada con la visión de transformar la manera en que las personas compran productos en línea, 
                brindando una experiencia única y personalizada a cada uno de nuestros usuarios.
                <img src={fato} alt="Foto de Mauricio Rodríguez Ballesteros" className="rounded-full w-52 h-52 mb-4 mt-4 border-2 border-gray-100 shadow-lg shadow-slate-500 justify-self-center"/>
            </p>
        </div>
    </div>
    <div className="contenedor-informacion justify-self-center">
        <div className="group relative w-full mb-2 font-semibold cursor-pointer z-[5]">
            <p>Misión</p>
            <p className="absolute left-0 top-full bg-white shadow-lg font-normal rounded-lg opacity-0 translate-y-5 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 p-4 border-2 border-gray-200 z-40">
            Desde joven, siempre tuve una fascinación por el mundo digital y el comercio.
                 Con tan solo 23 años y una gran pasión por la tecnología y la innovación, decidí emprender este viaje. 
                 Como mexicano, crecí viendo el potencial que tiene nuestro país en el ámbito digital, pero también me di 
                 cuenta de las dificultades que enfrentan muchas pequeñas y medianas empresas para ofrecer sus productos 
                 en línea de forma sencilla y efectiva. Eso fue lo que me impulsó a crear Master Market.
                <img src={futo} alt="Foto de Mauricio Rodríguez Ballesteros" className="rounded-full w-52 h-52 mb-4 mt-4 border-2 border-gray-100 shadow-lg shadow-slate-500 justify-self-center"/>
            </p>
        </div>
    </div>
    <div className="contenedor-informacion justify-self-end">
        <div className="group relative w-full mb-2 font-semibold cursor-pointer z-2">
            <p>Visión</p>
            <p className="absolute left-0 top-full bg-white shadow-lg font-normal rounded-lg opacity-0 translate-y-5 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 p-4 border-2 border-gray-200 z-40">
            Mi sueño siempre fue crear una plataforma que no solo conectara a los compradores 
                    con los productos que buscan, sino que también ayudara a los vendedores a maximizar su potencial de venta 
                    de manera fácil y accesible. Queríamos que Master Market fuera un puente entre ambos mundos: el de los 
                    emprendedores y los consumidores, permitiendo que cada uno tuviera una experiencia única y satisfactoria.
                    La historia detrás de Master Market comenzó cuando, tras años de investigar sobre el comercio electrónico y 
                    las plataformas existentes, me di cuenta de que el mercado aún necesitaba algo más accesible, rápido y personalizado.
                <img src={carro} alt="Foto de Mauricio Rodríguez Ballesteros" className="rounded-full w-52 h-52 mb-4 mt-4 border-2 border-gray-100 shadow-lg shadow-slate-500 justify-self-center"/>
            </p>
        </div>
    </div>
    <div className="contenedor-informacion justify-self-center">
        <div className="group relative w-full mb-2 font-semibold cursor-pointer z-[1]">
            <p>Equipo</p>
            <p className="absolute left-0 top-full bg-white shadow-lg font-normal rounded-lg opacity-0 translate-y-5 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 p-4 border-2 border-gray-200 z-40">
            Con la ayuda de un equipo de colaboradores con la misma pasión y visión, decidimos crear una plataforma que tuviera 
                    como principal objetivo ofrecer productos de calidad, con un servicio al cliente excepcional, y sobre todo, con la 
                    seguridad de que cada transacción fuera rápida y segura.
                    Master Market no solo es un negocio para mí, es una misión: ofrecer a cada cliente una experiencia de compra única y eficiente.
                <img src={grupo} alt="Foto de Mauricio Rodríguez Ballesteros" className="rounded-full w-52 h-52 mb-4 mt-4 border-2 border-gray-100 shadow-lg shadow-slate-500 justify-self-center"/>
            </p>
        </div>
    </div>
    <div className="contenedor-informacion justify-self-start">
        <div className="group relative w-full mb-2 font-semibold cursor-pointer z-0">
            <p>Agradecimientos</p>
            <p className="absolute left-0 top-full bg-white shadow-lg font-normal rounded-lg opacity-0 translate-y-5 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 p-4 border-2 border-gray-200 z-10">
            Desde su lanzamiento, hemos trabajado incansablemente para seguir mejorando y adaptarnos a las necesidades cambiantes del mercado,
                    siempre manteniendo en el centro a nuestros usuarios.
                    Estoy muy emocionado de que estés aquí y de que formes parte de esta comunidad. Espero que disfrutes de la experiencia en 
                    nuestra plataforma tanto como nosotros disfrutamos crearla para ti. ¡Bienvenido a Master Market, donde cada compra es un paso 
                    hacia un futuro mejor!
                    Gracias por tu confianza, Mauricio Rodríguez Ballesteros. Fundador y CEO de Master Market.
                <img src={futo} alt="Foto de Mauricio Rodríguez Ballesteros" className="rounded-full w-52 h-52 mb-4 mt-4 border-2 border-gray-100 shadow-lg shadow-slate-500 justify-self-center"/>
            </p>
        </div>
    </div>
        </div>
        </div>
    )
}

export default NosotrosPage