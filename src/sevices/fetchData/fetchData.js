// api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdbFetch = async (endpoint, params = {}) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            params: {
                api_key: API_KEY,
                ...params
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching from ${endpoint}:`, error);
        throw error;
    }
};

// Helper function for year filtering
const buildYearParams = (year) => {
    if (!year) return {};
    
    const decadeMap = {
        '2020s': { gte: '2020-01-01', lte: '2029-12-31' },
        '2010s': { gte: '2010-01-01', lte: '2019-12-31' },
        '2000s': { gte: '2000-01-01', lte: '2009-12-31' },
        '1990s': { gte: '1990-01-01', lte: '1999-12-31' },
        '1980s': { gte: '1980-01-01', lte: '1989-12-31' },
        '1970s': { gte: '1970-01-01', lte: '1979-12-31' },
        '1960s': { gte: '1960-01-01', lte: '1969-12-31' },
        '1950s': { gte: '1950-01-01', lte: '1959-12-31' },
    };
    
    if (decadeMap[year]) {
        return {
            'primary_release_date.gte': decadeMap[year].gte,
            'primary_release_date.lte': decadeMap[year].lte,
        };
    }
    
    return { 'primary_release_year': year };
};

// Helper to build common filter params
const buildFilterParams = (filters = {}) => {
    const params = {};
    
    if (filters.genre) params.with_genres = filters.genre;
    if (filters.sortBy) params.sort_by = filters.sortBy;
    if (filters.rating) params['vote_average.gte'] = parseFloat(filters.rating);
    if (filters.year) {
        Object.assign(params, buildYearParams(filters.year));
    }
    
    return params;
};

// Specific functions
export const fetchPopularMovies = (page = 1, filters = {}) => {
    return tmdbFetch('/discover/movie', {
        page,
        ...buildFilterParams(filters)
    });
};

export const fetchTopRated = (page = 1, filters = {}) => {
    // Note: /movie/top_rated doesn't support all filters, only page
    // If you need filtering, use /discover/movie with 'vote_average.gte'
    return tmdbFetch('/movie/top_rated', { page });
};

export const fetchSearchMovies = (query, page = 1, filters = {}) => {
    const params = {
        query,
        page,
        ...buildFilterParams(filters)
    };
    // Remove sortBy for search as it's not supported by /search/movie
    delete params.sort_by;
    
    return tmdbFetch('/search/movie', params);
};
export const fetchMovie = (movieId) => {
    const params = {
        append_to_response: 'credits,videos,images,similar,recommendations'
    };
    return tmdbFetch(`/movie/${movieId}`, params);
};