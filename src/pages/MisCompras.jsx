import React, { useEffect, useState } from "react";
import { getAllPurchases } from "../api/compras.api";
import Product from "../components/Product";
import flecha from "../images/flecha.png"
import { useNavigate } from "react-router-dom";

const MisCompras = () => {

    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
            async function solicitoCompras() {
                const res = await getAllPurchases()
                    setProducts(res.data)
                    console.log(res.data)
                }   
            solicitoCompras()
        },[])

    return (
        <>
        <div className="flex flex-wrap w-full mt-[55px]">
            <div className="relative xs:w-full xs:text:lg text-black mb-8 flex justify-center font-semibold text-lg"><div className="absolute w-full flex items-center cursor-pointer z-10"><img onClick={() => navigate(-1)} src={flecha} alt="back" className="relative xs:w-7 xs:h-7 flex items-center justify-center" ></img></div><div className="absolute xs:w-full flex justify-center items-center z-0">Mis compras</div></div>
            <div className="xs:w-full bg-gray-300 flex flex-wrap p-2 justify-center">
                {
                    products.map((res) => (
                        <div className="w-1/6 xs:min-w-[120px] bg-white flex-wrap justify-center mb-3 border border-gray-400 p-1 mx-4" key={res.id}>
                        <Product key={res.id} product={res} />
                        </div>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default MisCompras