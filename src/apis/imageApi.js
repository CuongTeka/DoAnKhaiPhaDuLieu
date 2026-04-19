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

export const handleGetImageLimitApi = (folder, page, limit) => {
  return axios.get(
    `/get-images-limit?folder=${folder}&page=${page}&limit=${limit}`
  );
};

export const handleGetImageByNameApi = (name) => {
  return axios.get(`/get-image-by-name?name=${name}`);
};

const handleUpdateImageApi = (id, data) => {
  return axios.put(`/update-image/${id}`, data);
};

const handleDeleteImageApi = (id) => {
  return axios.delete(`/delete-image/${id}`);
};

const changeActive = (id, data) => {
  return axios.put(`/change-image-active/${id}`, data);
};

export {
  handleUploadApi,
  handleGetImageApi,
  changeActive,
  handleUpdateImageApi,
  handleDeleteImageApi,
};
