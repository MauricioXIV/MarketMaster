import axios from "axios"
import toast from "react-hot-toast"

const userApi = axios.create({
    baseURL: 'https://fc32-201-130-218-103.ngrok-free.app/login/ingreso/'
})

export const getAllUsers = () => {
    return userApi.get('/')
}

export const addUser = (user) => {
  try {
    return userApi.post('/', user)
  } catch (error) {
    console.error('Error al crear usuario', error)
  }
}

export const deleteUser = (id) => {
    return userApi.delete(`/${id}/`)
}

export const updateUser = (id, user) => {
    return userApi.put(`/${id}/`, user)
}

export const getUser = () => {
  try {
    return axios.get("https://fc32-201-130-218-103.ngrok-free.app/login/user/profile/", {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
  } catch (error) {
    console.error('Error fetching profile:' , error)
  }
}

const login = async (email, password) => {
    try {
      const response = await axios.post('https://fc32-201-130-218-103.ngrok-free.app/login/token/', {
        email,
        password
      });
      
      const { access, refresh } = response.data;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      
      return true;
    } catch (error) {
      console.error('Error de autenticación:', error);
      return false;
    }
  };

  export default login


  export const updateProfile = (data) => {
    try {
      return axios.put("https://fc32-201-130-218-103.ngrok-free.app/login/user/profile/editar/", data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    } catch (error) {
      console.error('Error fetiching profile:' , error)
    }
  }
  