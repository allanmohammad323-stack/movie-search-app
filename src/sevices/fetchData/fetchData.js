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
export const fetchPopularMovies = (page = 1, filters = {}) => {
    const params = { page };
    
    if (filters.genre) params.with_genres = filters.genre;
    if (filters.sortBy) params.sort_by = filters.sortBy;
    if (filters.rating) params['vote_average.gte'] = filters.rating;
    if (filters.year) {
        if (filters.year.includes('s')) {
            const decade = parseInt(filters.year);
            params['primary_release_date.gte'] = `${decade}-01-01`;
            params['primary_release_ date.lte'] = `${decade + 9}-12-31`;
        } else {
            params['primary_release_year'] = filters.year;
        }
    }
    
    return tmdbFetch('/discover/movie', params);
};

export const fetchTopRated = (page = 1) => 
    tmdbFetch('/movie/top_rated', { page });

export const fetchSearchMovies = (query, page = 1, filters = {}) => {
    const params = { query, page };
    
    if (filters.genre) params.with_genres = filters.genre;
    if (filters.year) {
        if (filters.year.includes('s')) {
            const decade = parseInt(filters.year);
            params['primary_release_date.gte'] = `${decade}-01-01`;
            params['primary_release_date.lte'] = `${decade + 9}-12-31`;
        } else {
            params['primary_release_year'] = filters.year;
        }
    }
    if (filters.rating) params['vote_average.gte'] = filters.rating;
    
    return tmdbFetch('/search/movie', params);
};

export const fetchSearchTVShows = (query, page = 1) => 
    tmdbFetch('/search/tv', { query, page });

export const fetchSearchMulti = (query, page = 1) => 
    tmdbFetch('/search/multi', { query, page }); // Searches movies, TV, people