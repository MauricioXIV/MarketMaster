import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Product = ({ product }) => {

    const { descuento, setDescuento, agregarDescuento, suerte, setSuerte, agregarSuerte  } = useContext(CartContext)

    function capitalizeFirstLetter(str) {
        if (!str) return ''
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const navigate = useNavigate()
    const calcularSuerte = () => Math.random() > 0.5;

    const handleClick = () => {
        navigate(`/login/productos/unico/${product.id}`) 
    }

    useEffect(() => {
        if (!descuento || !descuento[product.id]) {
        const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
        agregarDescuento(product.id, numeroAleatorio);
    }
        if (!suerte || suerte[product.id] === undefined) {
            const envio = calcularSuerte()
            agregarSuerte(product.id, envio);
        }
    }, [product.id]);

    console.log("ID:", product.id, "→ suerte:", suerte[product.id]);



    return (
        <>
        { !product.fecha_compra ? (   
        <div key={product.id} onClick={handleClick} className="flex flex-wrap">
            <div className="w-full flex justify-center m-2 border-b pb-1">
                  <img src={`https://backend-mm-production.up.railway.app/media/${product.image}`} alt={product.name} />
            </div>
        <div className="flex flex-wrap items-center h-auto">
              <div className="xs:w-full">
                  <h1 className="text-black font-semibold text-xs pl-2">{product.title}</h1>
              </div>
              <div className="xs:text-xs xs:w-full pl-2 text-[#212529] flex items-center">{product.description}</div>
              <div className="flex xs:w-full pl-2 items-center">
                  <div className="text-black flex flex-wrap xs:w-auto">$ {Number(product.price).toLocaleString("es-MX")}</div><div className="text-green-600 xs:text-xxs flex xs:w-auto items-center pl-1">{(descuento[product.id])}% OFF</div>
              </div>
              <div className="flex xs:w-full items-center">
              <div className={`text-green-600 ${suerte?.[String(product.id)] === true ? "bg-green-100 rounded-md p-4" : "bg-white"} xs:w-full font-semibold xs:text-xs flex items-center justify-center xs:max-h-[15px] xs:m-1`}>{suerte?.[String(product.id)] === true ? "Envío gratis" : null}</div>
              </div>
          </div>
        </div>
        ) : (
            <>
                <div className="w-full flex justify-center p-1">
                    <img src={`https://backend-mm-production.up.railway.app/media/${product.image}`} alt={product.name} />
                </div>
                <div className="mb-1 xs:max-h-[28px]">
                    <h1 className="text-black font-semibold text-xs pl-2">{product.title}</h1>
                </div>
                <div className="xs:text-xs pl-2 text-[#212529] my-1">{product.description}</div>
                <div className="xs:text-xs pl-2 text-[#14A44D]"><div>${Number(product.price).toLocaleString("es-MX")}</div></div>
                <div className="xs:text-xs pl-2 font-bold">Fecha de compra: {product.fecha_compra}</div>
            </>
        )}
      </>
      
    )
}

export default Product