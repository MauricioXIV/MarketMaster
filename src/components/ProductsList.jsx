import React, { useContext, useEffect, useRef, useState } from "react";
import { getAllProducts, getProduct, getProductsByCategory } from "../api/products.api";
import Product from "./Product";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { logoutUser } from "../api/refreshToken";
import usuariote from "../images/usuariote.png"
import logout from "../images/log-out.png"
import camisita from "../images/camisita.png"
import compu from "../images/compu.png"
import Casita from "../videos/House";
import Inicio from "../videos/Inicio";
import shop from "../images/shop.png";
import { set } from "react-hook-form";
import { useLayoutEffect } from "react";




const ProductsList = () => {

  const [query, setQuery] = useState("");
  const { resultados, setResultados } = useContext(CartContext)

  const navigate = useNavigate()

  const location = useLocation();

  const estaEnProductos = location.pathname === '/login/productos';

  const buscarProductos = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      try {
        const { data } = await axios.get(`https://backend-mm-production.up.railway.app/productos/set/productos/search/?q=${e.target.value}`,{
          withCredentials: true,
        });
        setResultados(data.productos);
        console.log(data.productos);
      } catch (error) {
        console.error("Error en la búsqueda:", error);
      }
    } else {
      setResultados([]);
    }
  };

    const [products, setProducts] = useState([])
    const category = useParams().category

    function capitalizeFirstLetter(str) {
        if (!str) return ''
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    const titulo = category ? capitalizeFirstLetter(category) : null

    useEffect(() => {
        async function solicitoProductos() {
            try {
              if (resultados) {
                setProducts(resultados);
              }
              if (category) {
                const res = await getProductsByCategory(category)
                setProducts(res.data)
            } else {
                const res = await getAllProducts()
                setProducts(res.data) 
              }
            } catch (error) {
                console.error("Error al obtener los productos:", error); 
            } 
      }
        solicitoProductos()
    },[category])

    const productosMostrar = resultados.length ? resultados : products;

    const mostrarPromos = estaEnProductos && !category && resultados.length === 0 

    return (
        <div className="pt-[50px] w-screen">{titulo && !resultados.length ? <h1 className="text-2xl mb-2 text-center font-mono border-b text-gray-800 bg-blue-400 py-1 shadow-md">{titulo}</h1> : <h1 className="text-2xl mb-4 text-center font-mono border-b text-gray-600 bg-blue-200 py-1 shadow-md hidden">{titulo}</h1>}
          <div className="w-full flex flex-wrap pt-2 justify-center">
          <div className="w-full flex overflow-x-auto space-x-4 px-4 scrollbar-hide mb-4 sm:justify-center larguito:hidden">
            <div className="colcat"><div onClick={() => {navigate('/login/productos')
                                                        setResultados([])}} 
            className="category"><div className="flex items-center justify-center w-full"><Inicio /> </div></div><div className="text-black">Inicio</div></div>
            <div className="colcat"><div onClick={() => {navigate('/login/productos/hogar')
                                                        setResultados([])}} 
            className="category"><div className="flex items-center justify-center w-full"><Casita /></div></div><div className="text-black">Hogar</div></div>
            <div className="colcat"><div onClick={() => {navigate('/login/productos/tecnologia')
                                                        }} 
            className="category"><div className="flex items-center justify-center w-full"><img src={compu} className="xs:w-14 xs:h-14 rounded-full" /></div></div><div className="text-black">Tecnología</div></div>
            <div className="colcat"><div onClick={() => {navigate('/login/productos/outfit')
                                                        setResultados([])}} 
            className="category"><div className="flex items-center justify-center w-full"><img src={camisita} className="xs:w-14 xs:h-14 rounded-full" /></div></div><div className="text-black">Outfit</div></div>
            <div className="colcat"><div onClick={() => {navigate('/login/perfil')
                                                        setResultados([])}} 
            className="category"><div className="flex items-center justify-center w-full"><img src={usuariote} className="xs:w-14 xs:h-14 rounded-full" /></div></div><div className="text-black">Perfil</div></div>
            <div className="colcat"><div onClick={() => {navigate('/compras')
                                                        setResultados([])}} 
            className="category"><div className="flex items-center justify-center w-full"><img src={shop} className="xs:w-16 xs:h-16 rounded-full" /></div></div><div className="text-black">Compras</div></div>
            <div className="colcat"><div onClick={() => logoutUser()} className="category pl-3"><img src={logout} className="xs:w-14 xs:h-14" /></div><div className="text-black">Logout</div></div>
          </div>
          </div>
        <div className="flex flex-wrap justify-end items-center mr-4 mb-2 mt-4 xs:hidden">
            <Search className="text-gray-500 mr-2" />
                <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={buscarProductos}
                className="pl-1 mr-2 rounded-lg border-2 border-gray-500"
            />
        </div>
        {mostrarPromos && (
          <div className="justify-center items-center flex xs:w-full diminuto:text-lg peque:text-xl font-mono md:text-2xl font-bold tracking-widest mt-1">
          🔥NUESTRAS PROMOCIONES TOP🔥
        </div>
        )}
        <div className="flex flex-wrap justify-center gap-6 mb-32 p-4">
            {
                productosMostrar.map((res, index) => {
                  const filaIndex = Math.floor(index / 5)
                  const isFilaEspecial = filaIndex === 1 && estaEnProductos === true
                  return (
                  
                  <React.Fragment key={res.id}>
                  {index === 5 && estaEnProductos === true ? (
                    <div className="xs:hidden lg:flex lg:w-full lg:justify-center font-bold text-2xl font-mono ">
                      LO MÁS BUSCADO
                    </div>
                  ): null}
                  {index === 10 && estaEnProductos === true ? (
                    <div className="xs:hidden lg:flex lg:w-full lg:justify-center font-bold text-2xl font-mono ">
                      ¡NO TE QUEDES SIN EL TUYO!
                    </div>
                  ): null}
                  <div className={`w-1/6 xs:min-w-[120px]
                  diminuto:min-w-[160px] sm:min-w-[170px] 
                  border border-gray-200 bg-white shadow-sm
                  shadow-slate-400 text-zinc-700 
                  transition-transform duration-300 flex my-1 mx-1 hover:shadow-lg 
                  hover:shadow-slate-400 rounded-md`}>
                    <Product product={res} />
                  </div>
                  </React.Fragment>
                )
              })
            }
        </div>
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 min-w-[200px] lg:justify-self-center md:justify-self-center sm:justify-self-center xs:text-center text-xs mb-4 text-gray-500">Copyright © 2025 El presente canal de instrucción o ambiente,
           es operado por MauricioRodriBalle.com de México, S. de R.L. de C.V. 
           identificada bajo la marca comercial "Market Master" Blvd.
          Miguel de Cervantes Saavedra 13947, Pisos 65 y 290, Granada, Miguel Sánchez, 1152 0 Mazatlán, México. 
        </div>
        </div>
    )
}

export default ProductsList