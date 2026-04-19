import axios from "../axios";

const handleUploadApi = (formData) => {
  return axios.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}; //upload

const handleGetImageApi = () => {
  return axios.get("/get-images");
};

const changeActive = (id, data) => {
  return axios.put(`/change-image-active/${id}`, data);
};

export { handleUploadApi, handleGetImageApi, changeActive };
