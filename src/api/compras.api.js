import axios from "axios"
import { getCookie } from "../cookie/getCookie"
axios.defaults.withCredentials = true;


const compraApi = axios.create({
    baseURL: 'https://backend-mm-production.up.railway.app/compras/set/compras/'
})

export const getAllPurchases = () => {
    return compraApi.get('/', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            'X-CSRFToken': getCookie('csrftoken'),
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    })
}

export const postCarrito = async (data) => {
    const accessToken = localStorage.getItem('access_token');
    const csrfToken = getCookie('csrftoken');
    return axios.post('https://backend-mm-production.up.railway.app/compras/set/shop/', data , {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
};

export const initializeCSRF = async () => {
    try {
      await axios.get('https://backend-mm-production.up.railway.app/login/', {
        withCredentials: true,
      })
      console.log('CSRF cookie establecida');
    } catch (error) {
      console.error('Error al inicializar CSRF:', error);
    }
  };