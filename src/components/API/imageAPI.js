import axios from "axios";

const API_KEY = "En3UhBTNJe6OGbmm_t1hNH9-bZQQ9eaV-Z82Hz8bgpk";
axios.defaults.baseURL = "https://api.unsplash.com/";
const END_POINT = "search/photos";

const getPhotos = async (searchQuery, page) => {
  const res = await axios.get(END_POINT, {
    params: {
      query: searchQuery,
      client_id: API_KEY,
      orientation: "landscape",
      per_page: 15,
      page: page,
    },
  });

  return res.data;
};
export default getPhotos;
