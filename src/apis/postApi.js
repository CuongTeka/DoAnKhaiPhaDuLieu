import axios from "../axios";

export const createPostApi = async (postData, id) => {
  return await axios.post("/post", postData, id);
};

export const fetchPostsApi = async () => {
  return await axios.get("/get-post");
};
