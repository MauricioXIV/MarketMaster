import axios from "axios";

let isRefreshing = false;

let failedRequestsQueue = [];

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && error.response.data?.code === "token_not_valid") {
      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({ resolve, reject });
        }).then(() => {
          originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        logoutUser();
        return Promise.reject(error);
      }
      
      try {
        const response = await axios.post('http://localhost:8000/login/token/refresh/', {
          refresh: refreshToken
        }, {
          skipAuthRefresh: true
        });
        
        const newAccessToken = response.data.access;
        localStorage.setItem('access_token', newAccessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;


        failedRequestsQueue.forEach(pending => pending.resolve());
        failedRequestsQueue = [];
        
        return axios(originalRequest);
      } catch (refreshError) {

        failedRequestsQueue.forEach(pending => pending.reject(refreshError));
        failedRequestsQueue = [];
        
        if (refreshError.response?.status === 401) {
          logoutUser();
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    
    return Promise.reject(error);
  }
);

 export function logoutUser() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  delete axios.defaults.headers.common['Authorization'];

  window.location.replace('/login');
}

axios.interceptors.request.use(config => {
  if (config.skipAuthRefresh) {
    delete config.headers['Authorization'];
  }
  return config;
});