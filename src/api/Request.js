import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({  
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    if (accessToken && refreshToken) {
      config.headers["authorization"] = `bearer ${accessToken}`;
      config.headers["authorizationletter"] = `carrier ${refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      return api
        .get("/auth/refresh-token")

        .then((response) => {
          // handle success
          if (response.status === 200) {
            const accessToken = Cookies.get("accessToken");
            const refreshToken = Cookies.get("refreshToken");
            originalRequest.headers.authorization = `bearer ${accessToken}`;
            originalRequest.headers.authorizationletter = `carrier ${refreshToken}`;
            return api.request(originalRequest);
          } else {
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            window.location.href = "/auth/login";
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
    if (error.response.status === 498) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;
