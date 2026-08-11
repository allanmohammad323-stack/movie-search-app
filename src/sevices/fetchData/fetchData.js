import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const fetchData = async (page) => {
    console.log("data fetching...");
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: API_KEY,
            page: page
        }
    });
    console.log(response.data);
    console.log("data fetched");
    return response.data;
};