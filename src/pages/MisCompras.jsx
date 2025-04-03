import React, { useEffect, useState } from "react";
import { getAllPurchases } from "../api/compras.api";
import Product from "../components/Product";

const MisCompras = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
            async function solicitoCompras() {
                const res = await getAllPurchases()
                    setProducts(res.data)
                    console.log(res.data)
                }   
            solicitoCompras()
        },[])

    return (
        <div className="flex flex-wrap w-full">
            <h1 className="text-zinc-900 text-3xl font-bold mb-4 mt-3 font-roboto w-full">Historial de compras</h1>
            <div className="flex gap-4 justify-center flex-wrap p-5 border-4 border-gray-300 shadow-xl mb-32 bg-[#F8F9FA]">
                {
                    products.map((res) => (
                        <div key={res.id} className="w-full sm:w-1/2 md:w-1/4 lg:w-1/5 min-w-[200px] border-2 border-gray-500 rounded-lg p-4 m-2 bg-white shadow-lg hover:shadow-xl shadow-slate-400 text-zinc-700 hover:bg-gray-200 flex my-auto">
                        <Product key={res.id} product={res} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MisCompras