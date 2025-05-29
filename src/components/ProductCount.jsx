import React from "react";

const ProductCount = ({ contador, handleRestar, handleSumar, handleAgregar }) => {

    return(
        <>
        <div className="flex flex-wrap justify-center xs:w-full">
            <div className="flex justify-center xs:w-2/3 xs:min-h-[35px]">
                <div onClick={handleAgregar} className="xs:w-5/6 bg-blue-900 flex justify-center items-center 
                text-white rounded-lg cursor-pointer xs:text-sm md:text-base">Agregar al carrito ({contador})
                </div>
            </div>
            <div className="flex xs:w-1/3 justify-end items-center">
                    <div onClick={handleRestar} className="botonazo">-</div>
                    <div onClick={handleSumar} className="botonazo bg-green-600 hover:bg-green-700">+</div>
            </div>
        </div>
        </>
    )
}

export default ProductCount