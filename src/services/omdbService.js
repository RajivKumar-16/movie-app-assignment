const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query) => {
  if (!query || query.trim().length < 2) return [];

  const response = await fetch(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Network error while fetching movies');
  }

  const data = await response.json();
  if (data.Response === 'False') {
    throw new Error(data.Error || 'No movies found');
  }

  return data.Search || [];
};