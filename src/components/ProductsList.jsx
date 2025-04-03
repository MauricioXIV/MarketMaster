import React, { useEffect, useState } from "react";
import { getAllProducts, getProduct, getProductsByCategory } from "../api/products.api";
import Product from "./Product";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";

const ProductsList = () => {

  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);

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
    
    const titulo = category ? capitalizeFirstLetter(category) : "Nuestros productos estrella"

    useEffect(() => {

        async function solicitoProductos() {
            if (category) {
                const res = await getProductsByCategory(category)
                setProducts(res.data)
            } else {
                const res = await getAllProducts()
                setProducts(res.data)
            }   
        }
        solicitoProductos()
    },[category])

    const productosMostrar = resultados.length ? resultados : products;

    return (
        <div><h1 className="text-zinc-900 text-3xl font-extrabold mb-4 mt-3 justify-self-center">{titulo}</h1>
        <div className="flex flex-wrap justify-end items-center mr-4">
            <Search className="text-gray-500 mr-2" />
                <input
                type="text"
                placeholder="Buscar productos..."
                value={query}
                onChange={buscarProductos}
                className="mr-2 rounded-lg border-2 border-gray-500"
            />
        </div>
        <div className="flex flex-wrap justify-center gap-4 p-5 border-8 border-gray-100 shadow-xl shadow-slate-600 mb-32 bg-[#F8F9FA] mx-4">
            {
                productosMostrar.map((res) => (
                  <div key={res.id} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 min-w-[200px] border-2 border-gray-500 rounded-lg p-4 m-2 bg-white shadow-lg hover:shadow-xl shadow-slate-400 text-zinc-700 hover:bg-gray-200 hover:scale-105 transition-transform duration-300">
                    <Product product={res} />
                  </div>
                ))
            }
        </div>
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 min-w-[200px] justify-self-center text-xs mb-4 text-gray-500">Copyright © 2025 El presente canal de instrucción o ambiente,
           es operado por MauricioRodriBalle.com de México, S. de R.L. de C.V. 
           identificada bajo la marca comercial "Master Market".Blvd.
          Miguel de Cervantes Saavedra 13947, Pisos 65 y 290, Granada, Miguel Sánchez, 1152 0 Mazatlán, México. 
        </div>
        </div>
    )
}

export default ProductsList