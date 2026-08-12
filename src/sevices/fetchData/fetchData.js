// api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Base fetch function
const tmdbFetch = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            params: {
                api_key: API_KEY,
                ...params
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        throw error;
    }

    
};

// Specific functions
export const fetchPopularMovies = (page = 1) => 
    tmdbFetch('/movie/popular', { page });

export const fetchTopRated = (page = 1) => 
    tmdbFetch('/movie/top_rated', { page });

export const fetchSearchMovies = (query, page = 1) => 
    tmdbFetch('/search/movie', { query, page });

export const fetchSearchTVShows = (query, page = 1) => 
    tmdbFetch('/search/tv', { query, page });

export const fetchSearchMulti = (query, page = 1) => 
    tmdbFetch('/search/multi', { query, page }); // Searches movies, TV, people