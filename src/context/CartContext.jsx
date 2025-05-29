import React, { useEffect, useState } from "react";
import { createContext } from "react";
import toast from 'react-hot-toast'

export const CartContext = createContext()

const carritoInicial = JSON.parse(localStorage.getItem("carrito"))  || []


export const CartProvider = ({ children }) => {

    const [recibir, setRecibir] = useState("")

    const [dinero, setDinero] = useState(0)

    const [carrito, setCarrito] = useState(carritoInicial)

    const [resultados, setResultados] = useState([]);

    const [evito, setEvito] = useState(false)

    const [pam, setPam] = useState(false);

    const [descuento, setDescuento] = useState(() => {
        const stored = sessionStorage.getItem("descuento");
        return stored ? JSON.parse(stored) : {};
    });

    const [suerte, setSuerte] = useState(() => {
        const lucky = sessionStorage.getItem("suerte");
        return lucky ? JSON.parse(lucky) : {};
    });

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
                    fontSize: "15px"
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
                    fontSize: "15px"
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
                fontSize: "15px"
            }
        })
    }
    const vaciarCarrito1 = () => {
        setCarrito([])
    }

    const eliminarDelCarrito = (idProducto) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== idProducto);
    setCarrito(nuevoCarrito);
    toast.success("Producto eliminado del carrito", {
        position: "bottom-right",
        style: {
            background: "#101010",
            color: "#fff",
            fontSize: "15px"
        }
    });
};


    const cantidadEnCarrito = () => {
        return carrito.reduce((acc, prod) => acc + prod.cantidad, 0)
    }

    const totalCarrito = () => {
        return carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0)
    }

    const agregarDescuento = (productId, porcentaje) => {
        setDescuento(prev => ({
            ...prev,
            [productId]: porcentaje
        }));
    };

    const agregarSuerte = (productId, suerte) => {
        const valorBooleano = suerte === true;
        setSuerte(prev => {
        const actualizado = {
      ...prev,
      [productId]: valorBooleano
    };
    return actualizado;
  });
};



    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito))
        sessionStorage.setItem("descuento", JSON.stringify(descuento));
        sessionStorage.setItem("suerte", JSON.stringify(suerte));
    }, [carrito, descuento, suerte])

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
            resultados,
            setResultados,
            descuento,
            setDescuento,
            agregarDescuento,
            suerte,
            setSuerte,
            agregarSuerte,
            eliminarDelCarrito,
            evito,
            setEvito,
            pam,
            setPam
        }}>
        {children}
        </CartContext.Provider>

    )

}