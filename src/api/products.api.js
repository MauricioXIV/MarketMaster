import axios from "axios"

const productApi = axios.create({
    baseURL: 'https://fc32-201-130-218-103.ngrok-free.app/productos/set/productos/'
})

export const getAllProducts = () => {
    return productApi.get('/', {
        withCredentials: true,
    })
}

export const getProduct = (id) => {
    return productApi.get('/', {
        params: { id },
        withCredentials: true,
    })
}

export const getProductsByCategory = (category) => {
    return productApi.get('/', {
        params: { category },
        withCredentials: true,
    })
}