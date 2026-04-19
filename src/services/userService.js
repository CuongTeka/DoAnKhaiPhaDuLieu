import axios from "../axios";

const handleLoginApi = (username, pass) => {
  return axios.post(
    "/signin",
    { username, pass },
    { headers: { "Content-Type": "application/json" } }
  );
}; //login

const handleCheckAuth = () => {
  return axios.get("/auth/check");
};

const handleLogoutApi = () => {
  return (
    axios.post("/auth/logout"),
    { headers: { "Content-Type": "application/json" } }
  );
};

const handleUploadApi = (image, name, tag, folder, is_active) => {
  return axios.post("/upload", { image, name, tag, folder, is_active });
};

export { handleLoginApi, handleCheckAuth, handleLogoutApi, handleUploadApi };
