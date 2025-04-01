import axios from "axios"

const productApi = axios.create({
    baseURL: 'http://localhost:8000/productos/set/productos/'
})

export const getAllProducts = () => {
    return productApi.get('/')
}

export const getProduct = (id) => {
    return productApi.get('/', {
        params: { id }
    })
}

export const getProductsByCategory = (category) => {
    return productApi.get('/', {
        params: { category }
    })
}