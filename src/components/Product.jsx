import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Product = ({ product }) => {

    function capitalizeFirstLetter(str) {
        if (!str) return ''
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/login/productos/unico/${product.id}`) 
    }

    return (
        <>
        { !product.fecha_compra ? (   
          <div key={product.id} onClick={handleClick}>
              <div className="bg-[#0077B6] rounded-lg border-b-4 border-gray-500-600 shadow-2xl">
                  <h1 className="text-3xl justify-self-center text-white font-semibold">{product.title}</h1>
              </div>
              <div className="flex items-center justify-center w-full">
                  <img src={`https://backend-mm-production.up.railway.app/media/${product.image}`} alt={product.name} className="rounded-lg h-32 w-32"/>
              </div>
              <div className="flex items-center justify-center w-full">
                  <div className="text-2xl text-[#212529]">{capitalizeFirstLetter(product.category)}</div>
              </div>
              <div className="max-w-sm text-justify justify-self-center p-3 text-[#212529]">{product.description}</div>
              <div className="flex justify-center w-full">
                  <div className="text-[#14A44D]">${Number(product.price).toLocaleString("es-MX")}</div>
              </div>
          </div>
        ) : (
          <div key={product.id}>
              <div className="bg-[#0077B6] rounded-lg border-b-4 border-gray-500-600 shadow-2xl">
                  <h1 className="text-3xl justify-self-center text-white font-semibold">{product.title}</h1>
              </div>
              <div className="flex items-center justify-center w-full">
                  <img src={`https://backend-mm-production.up.railway.app/media/${product.image}`} alt={product.name} className="rounded-lg h-1/2 w-1/2" />
              </div>
              <div className="flex items-center justify-center w-full">
                  <div className="text-2xl">{capitalizeFirstLetter(product.category)}</div>
              </div>
              <div className="max-w-sm text-justify justify-self-center p-3">{product.description}</div>
              <div className="flex justify-center w-full">
                  <div className="text-[#14A44D]">${Number(product.price).toLocaleString("es-MX")}</div>
              </div>
              <div className="flex justify-center w-full">
                  <div>Fecha de compra: {product.fecha_compra}</div>
              </div>
          </div>
        )}
      </>
      
    )
}

export default Product