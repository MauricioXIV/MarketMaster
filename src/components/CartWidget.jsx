import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {

    const { cantidadEnCarrito } = useContext(CartContext)

    return (
        <div className="sm:w-1/4 md:w-1/4 lg:w-1/6 min-w-[105px] sm:h-auto md:h-auto lg:h-auto max-h-[45px] shadow-lg border-2 h-auto text-center mr-3 flex border-y-gray-900 sm:ml-2 sm:mt-2 sm:mb-2 lg:mt-0 md:mt-0 xs:mt-4">
            <Link to="login/carrito" className="w-full text-center">
            Carrito <div className="w-full h-full">({cantidadEnCarrito()})</div>
            </Link>
        </div>
    )
}

export default CartWidget