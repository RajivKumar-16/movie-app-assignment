import { useState, useEffect, useCallback } from 'react';
import { loadUserFavorites, deleteFavorite } from './favoritesModel';
import { useAuth } from '../../context/AuthContext';

export const useFavoritesViewModel = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchFavs = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await loadUserFavorites(user.uid);
      setFavorites(data);
    } catch (err) {
      setError('Could not load favorites.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchFavs();
  }, [fetchFavs]);

  const handleRemove = async (imdbID) => {
    if (!user) return;
    try {
      await deleteFavorite(user.uid, imdbID);
      setFavorites((prev) => prev.filter((item) => item.imdbID !== imdbID));
    } catch (err) {
      alert('Failed to remove movie.');
    }
  };

  return { favorites, loading, error, handleRemove };
};