import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { getUser } from '../api/login.api';
import { postCarrito } from '../api/compras.api';
import flecha from "../images/flecha.png"

const CompraPage = () => {

  const { carrito, totalCarrito, setRecibir, setDinero } = useContext(CartContext)
  const [aidi, setAidi] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
      async function solicitarPerfil() {
        const res = await getUser()
        console.log(res.data.coins)
        const money = res.data.coins - totalCarrito()
        setDinero(money)
        const aidi = res.data.id
        setAidi(aidi)
        console.log(aidi)
      }
      solicitarPerfil()
    }, [])

  const handleComprobante = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    setRecibir(formData.receiveOption)

    if (carrito.length > 0) {
     async function agregarCompra() {
        const itemsCarrito = Object.values(carrito).map((item) => ({
          title: item.title,
          description: item.description,
          category: item.category,
          price: item.price,
          stock: item.stock,
          image: item.image,
        }))
        const data = {
          user: aidi,
          items: itemsCarrito,
          total: totalCarrito()
        }
        const res2 = await postCarrito(data)
          if (res2.status === 200 || res2.status === 201) {
            console.log('Compra exitosa:', res2.data);
          } else {
            console.error('Error al realizar la compra:', res2);
          }
        }
      agregarCompra()
        toast.success("Compra realizada con éxito", {
          position: "bottom-right",
          style: {
            background: "#101010",
            color: "#fff",
            fontSize: "15px"
          }
          })
          navigate("/login/compra/comprobante")} 
          else {
            toast.error("El carrito está vacío", {
              position: "bottom-right",
              style: {
                background: "#fb3b1b",
                color: "#fff",
                fontSize: "15px"
            }
        })
        }
  }

  const [formData, setFormData] = useState({
    paymentMethod: '',
    receiveOption: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  return (
    <div className='flex flex-col items-center'>
    <>
    <div className="relative xs:w-full max-w-[520px] peque:min-w-[520px] mt-[55px] xs:text:lg text-black mb-10 p-2 flex justify-center font-semibold text-lg"><div className="absolute w-full flex items-center cursor-pointer z-10"><img onClick={() => navigate(-1)} src={flecha} alt="back" className="relative xs:w-7 xs:h-7 flex items-center justify-center pr-1" ></img></div><div className="absolute xs:w-full flex justify-center items-center z-0">Finalizar compra</div></div>
    <div className="text-black w-full max-w-[520px] flex-wrap flex-col justify-center px-6">
      <form onSubmit={handleSubmit}>
        <div className="casicompra">
          <label className="xs:text-sm" htmlFor="paymentMethod">
            Método de pago:
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          >
            <option className='text-black' value="">Seleccione un método</option>
            <option className='text-black' value="MP Coin">MM Coin</option>
          </select>
        </div>

        <div className="casicompra mb-2">
          <label className="xs:text-sm" htmlFor="receiveOption">
            Recibirás en:
          </label>
          <select
            id="receiveOption"
            name="receiveOption"
            value={formData.receiveOption}
            onChange={handleChange}
            className="w-full p-2 border mt-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            required
          >
            <option className='text-black' value="">Seleccione una opción</option>
            <option className='text-black' value="Casa">Casa</option>
            <option className='text-black' value="Paquetería">Paquetería</option>
          </select>
        </div>
        <div className='flex flex-wrap'>
          <div className='xs:w-1/2 text-black text-xs font-semibold mb-1'>Total Compra:</div><div className='xs:w-1/2 text-black text-xs font-semibold mb-1 flex justify-end'>$ {totalCarrito()}</div>
        <button
          type="submit"
          onClick={handleComprobante}
          disabled={!formData.paymentMethod || !formData.receiveOption}
          className={`w-full mt-4 p-1 mx-4 rounded-md focus:outline-none 
        focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm ${
            (!formData.paymentMethod || !formData.receiveOption)
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
          Confirmar Compra
        </button>
        </div>
      </form>
    </div>
    </>
    </div>
  );
};

export default CompraPage