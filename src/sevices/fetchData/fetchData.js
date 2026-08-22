// api.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getTmdbErrorMessage = (error) => {
    if (axios.isCancel(error)) return null;

    if (error.response) {
        const { status, data } = error.response;

        if (status === 401 || status === 403) {
            return 'TMDB rejected the request. Check the API key.';
        }

        if (status === 429) {
            return 'Too many requests. Please wait a moment and try again.';
        }

        if (status >= 500) {
            return 'TMDB is temporarily unavailable. Please try again shortly.';
        }

        return data?.status_message || 'TMDB could not complete the request.';
    }

    if (error.request) {
        return 'Unable to reach TMDB. Check your internet connection and try again.';
    }

    return 'Something went wrong. Please try again.';
};

const tmdbFetch = async (endpoint, params = {}, signal) => {
    try {
        const response = await axios.get(`${BASE_URL}${endpoint}`, {
            params: {
                api_key: API_KEY,
                ...params
            },
            timeout: 10000,
            signal
        });
        return response.data;
    } catch (error) {
        if (!axios.isCancel(error)) {
            console.error(`Error fetching from ${endpoint}:`, error);
        }
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

const fetchMoviesPerPage = async (endpoint, page, params, signal) => {
    const moviesPerPage = 22;
    const startIndex = (page - 1) * moviesPerPage;
    const firstTmdbPage = Math.floor(startIndex / 20) + 1;
    const resultOffset = startIndex % 20;
    const responses = await Promise.all([
        tmdbFetch(endpoint, { ...params, page: firstTmdbPage }, signal),
        tmdbFetch(endpoint, { ...params, page: firstTmdbPage + 1 }, signal)
    ]);
    const allResults = responses.flatMap(response => response.results);

    return {
        ...responses[0],
        results: allResults.slice(resultOffset, resultOffset + moviesPerPage),
        total_pages: Math.ceil(responses[0].total_results / moviesPerPage)
    };
};

// Specific functions
export const fetchPopularMovies = (page = 1, filters = {}, signal) => {
    return fetchMoviesPerPage('/discover/movie', page, {
        ...buildFilterParams(filters)
    }, signal);
};

export const fetchTopRated = (page = 1, filters = {}) => {
    // Note: /movie/top_rated doesn't support all filters, only page
    // If you need filtering, use /discover/movie with 'vote_average.gte'
    return tmdbFetch('/movie/top_rated', { page });
};

export const fetchSearchMovies = (query, page = 1, filters = {}, signal) => {
    const params = {
        query,
        ...buildFilterParams(filters)
    };
    // Remove sortBy for search as it's not supported by /search/movie
    delete params.sort_by;

    return fetchMoviesPerPage('/search/movie', page, params, signal);
};
export const fetchMovie = (movieId, signal) => {
    const params = {
        append_to_response: 'credits,videos,images,similar,recommendations'
    };
    return tmdbFetch(`/movie/${movieId}`, params, signal);
};

export const fetchWatchlistMovie = (movieId, signal) => {
    return tmdbFetch(`/movie/${movieId}`, {}, signal);
};