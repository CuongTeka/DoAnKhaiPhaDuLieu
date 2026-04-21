import axios from "axios";
import Cookies from "js-cookie"; // Assuming you store the token in cookies

const instance = axios.create({
  baseURL: import.meta.env.VITE_BEURL || "http://localhost:8080/api",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Get token from cookies
    // console.log("Token from Cookies:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// instance.interceptors.response.use((response) => {
//   (response) => response.data,
//     (error) => {
//       // Check for specific error codes or handle general errors
//       if (error.response) {
//         // Backend error
//         return Promise.reject(error.response.data);
//       } else if (error.request) {
//         // Network error or no response
//         return Promise.reject({ message: "Network error, please try again." });
//       } else {
//         // General axios error
//         return Promise.reject({ message: error.message });
//       }
//     };
// });

instance.interceptors.response.use(
  (response) => {
    // const {data} = response;
    // console.log("Axios Response:", response);
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
