import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/products.api";
import ProductCount from "../components/ProductCount";
import { CartContext } from "../context/CartContext";

const ProductDetailPage = () => {

    function capitalizeFirstLetter(str) {
      if (!str) return ''
      return str.charAt(0).toUpperCase() + str.slice(1);
  }

    const {carrito, agregarAlCarrito} = useContext(CartContext)

    const { id } = useParams()
    const [product, setProduct] = useState({})

    const [contador, setContador] = useState(0)

    useEffect(() => {
        async function solicitarProducto() {
          try {
            const res = await getProduct(id)
            console.log("Respuesta de la API:", res)
            setProduct(res.data[0] || res.data)
          } catch (error) {
            console.error("Error al cargar el producto:", error);
          }
        }
        solicitarProducto();
      }, [id]);

    function handleSumar() {
        setContador(contador + 1)
    }
    function handleRestar() {
        contador > 1 && setContador(contador - 1)
    }


    return(
    <div className="text-zinc-700 border-4 border-gray-200 w-1/4 min-w-[200px] rounded-lg bg-white flex-wrap flex-col justify-center shadow-md shadow-slate-400 h-1/2 hover:bg-gray-200 mt-8"> {Object.keys(product).length > 0 &&
        <>
        <div className="bg-[#0077B6] rounded-lg border-b-4 border-gray-500-600 shadow-2xl"><h1 className="text-3xl justify-self-center text-white font-semibold">{product.title}</h1></div>
        <div className="flex items-center justify-center w-full">  <img src={`https://backend-mm-production.up.railway.app/media/${product.image}`} alt={product.name} className="w-2/3 h-2/3 max-h-[300px] rounded-lg" /> </div>
        <div className="flex items-center justify-center w-full"><div className="text-2xl">{capitalizeFirstLetter(product.category)}</div></div>
        <div className="max-w-sm text-justify justify-self-center">{product.description}</div>
        <div className="flex justify-center w-full text-[#14A44D]"><div>${Number(product.price).toLocaleString("es-MX")}</div></div>
        <ProductCount 
        contador={contador}
        handleRestar={handleRestar}
        handleSumar={handleSumar}
        handleAgregar={() => { agregarAlCarrito(product, contador) }} />
        </>
            }
    </div>
    )
}

export default ProductDetailPage