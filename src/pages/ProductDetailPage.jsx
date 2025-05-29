import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct } from "../api/products.api";
import ProductCount from "../components/ProductCount";
import { CartContext } from "../context/CartContext";
import flecha from "../images/flecha.png"

const ProductDetailPage = () => {

  const navigate = useNavigate()

    function capitalizeFirstLetter(str) {
      if (!str) return ''
      return str.charAt(0).toUpperCase() + str.slice(1);
  }

    const {carrito, agregarAlCarrito, descuento, suerte} = useContext(CartContext)

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
        contador > 0 && setContador(contador - 1)
    }


    return(
      <>
    <div className="mt-[60px] text-zinc-700 xs:w-full
    min-w-[200px] flex-wrap justify-center h-full max-w-[520px] mb-4"> {Object.keys(product).length > 0 &&
        <>
        <div className="w-full flex mb-2 items-center cursor-pointer"><img onClick={() => navigate(-1)} src={flecha} alt="back" className="xs:w-7 xs:h-7" ></img></div>
        <div className=""><h1 className="xs:text-lg md:text-xl text-black pl-2">{product.title}</h1></div>
        <div className="xs:text-sm md:text-base text-black pl-2">{product.description}</div>
        <div className="flex w-full"><div className="xs:text-xs md:text-base flex bg-blue-900 text-white ml-2 mt-1 p-1 rounded-md"> MÁS VENDIDO </div></div>
        <div className="w-full flex justify-center p-2">
            <img src={`http://backend-mm-production.up.railway.app/media/${product.image}`} alt={product.name} />
        </div>
        <div className="flex w-full pl-2 xs:max-h-[20px] items-center">
          <div className="text-black xs:text-xl md:text-2xl font-medium">$ {Number(product.price).toLocaleString("es-MX")}</div><div className="text-green-600 xs:pl-2 xs:text-xs md:text-sm flex items-center">{(descuento[product.id])}% OFF</div>
        </div>
        <div className="flex flex-wrap w-full pl-2  my-2 items-center">
          <div className="xs:text-sm md:text-base font-bold text-green-600 mr-1">Llega {suerte?.[String(id)] === true ? "gratis" : null}</div><div className="xs:text-sm md:text-base font-thin">el viernes</div>
        </div>
        <ProductCount 
        contador={contador}
        handleRestar={handleRestar}
        handleSumar={handleSumar}
        handleAgregar={() => { agregarAlCarrito(product, contador), setContador(0) }} />
        </>
            }
    </div>
    </>
    )
}

export default ProductDetailPage