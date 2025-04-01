import React from "react";

const ProductCount = ({ contador, handleRestar, handleSumar, handleAgregar }) => {

    return(
        <>
        <div className="flex flex-wrap justify-center mb-2">
        <button onClick={handleRestar} className="w-1/4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-md mr-2">-</button>
        <button onClick={handleSumar} className="w-1/4  bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-md">+</button>
        </div>
        <div className="flex justify-center">
        <div onClick={handleAgregar} className="w-1/3 bg-amber-400 hover:bg-amber-500 rounded-lg cursor-pointer text-center">Agregar al carrito ({contador})</div>
        </div>
        </>
    )
}

export default ProductCount