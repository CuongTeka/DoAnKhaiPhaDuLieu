import axios from "../axios";

const handleGetAllBookApi = () => {
  return axios.get("/books");
};

export { handleGetAllBookApi };
