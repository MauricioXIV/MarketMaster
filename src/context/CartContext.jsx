import React, { useEffect, useState } from "react";
import { createContext } from "react";
import toast from 'react-hot-toast'

export const CartContext = createContext()

const carritoInicial = JSON.parse(localStorage.getItem("carrito"))  || []


export const CartProvider = ({ children }) => {

    const [recibir, setRecibir] = useState("")

    const [dinero, setDinero] = useState(0)

    const [carrito, setCarrito] = useState(carritoInicial)

    const agregarAlCarrito = (product, cantidad) => {
        console.log(product)
        const productAgregado = {...product, cantidad}

        const nuevoCarrito = [...carrito]
        const estaEnElcarrito = nuevoCarrito.find((producto) => producto.id === productAgregado.id)

        console.log(estaEnElcarrito)

        if (estaEnElcarrito) {
            estaEnElcarrito.cantidad += cantidad
            setCarrito(nuevoCarrito)
            if (cantidad !== 0) {
            toast.success("Agregado al carrito", {
                position: "bottom-right",
                style : {
                    background: "#101010",
                    color: "#fff",
                    fontSize: "25px"
                }
            })
        }
        } else {
            setCarrito([...carrito, productAgregado])
            if (cantidad !== 0) {
            toast.success("Agregado al carrito", {
                position: "bottom-right",
                style : {
                    background: "#101010",
                    color: "#fff",
                    fontSize: "25px"
                }
            })
        }
        }
    }

    const vaciarCarrito = () => {
        setCarrito([])
        toast.success("Eliminado del carrito correctamente", {
            position: "bottom-right",
            style : {
                background: "#101010",
                color: "#fff",
                fontSize: "25px"
            }
        })
    }
    const vaciarCarrito1 = () => {
        setCarrito([])
    }

    const cantidadEnCarrito = () => {
        return carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
    }

    const totalCarrito = () => {
        return carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0)
    }


    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }, [carrito])

    return(
        <CartContext.Provider value={{
            carrito,
            agregarAlCarrito,
            cantidadEnCarrito,
            vaciarCarrito,
            vaciarCarrito1,
            totalCarrito,
            recibir,
            setRecibir,
            dinero,
            setDinero,
        }}>
        {children}
        </CartContext.Provider>

    )

}