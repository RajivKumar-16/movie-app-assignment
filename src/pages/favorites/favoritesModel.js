import { getFavorites, removeFavoriteMovie } from '../../services/firebaseService';

export const loadUserFavorites = async (userId) => {
  return await getFavorites(userId);
};

export const deleteFavorite = async (userId, imdbID) => {
  await removeFavoriteMovie(userId, imdbID);
};