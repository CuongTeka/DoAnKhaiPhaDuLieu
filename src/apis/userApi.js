import axios from "../axios";

export const handleLoginApi = (username, pass) => {
  return axios.post(
    "/signin",
    { username, pass },
    { headers: { "Content-Type": "application/json" } }
  );
}; //login

export const handleCheckAuth = () => {
  return axios.get("/auth/check");
};

export const handleLogoutApi = () => {
  return (
    axios.post("/auth/logout"),
    { headers: { "Content-Type": "application/json" } }
  );
};

export const handleGetUserApi = (id) => {
  return axios.get(`/get-user/${id}`);
};

// export const handleUploadApi = (image, name, tag, folder, is_active) => {
//   return axios.post("/upload", { image, name, tag, folder, is_active });
// };
