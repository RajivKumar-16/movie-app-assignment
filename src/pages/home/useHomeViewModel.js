import { useState, useEffect, useCallback } from 'react';
import { fetchInitialMovies, getMovies } from './homeModel';

export const useHomeViewModel = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadInitial = useCallback(async () => {
    setLoading(true);
    setError('');
    setQuery('');
    try {
      const data = await fetchInitialMovies();
      setMovies(data);
    } catch (err) {
      setError(err.message || 'Failed to load movies.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  const handleSearch = async () => {
    if (!query || query.trim().length < 2) {
      setError('Search term must be at least 2 characters long.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const results = await getMovies(query);
      setMovies(results);
    } catch (err) {
      setError(err.message || 'Error occurred while searching.');
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    handleSearch,
    loadInitial,
  };
};