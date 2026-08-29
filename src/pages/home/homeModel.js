import { searchMovies } from '../../services/omdbService';

const SEED_KEYWORDS = ['Avengers', 'Batman', 'Spider', 'Matrix', 'Star Wars', 'Harry Potter'];

export const getMovies = async (query) => {
  if (!query || query.trim().length < 2) {
    throw new Error('Please enter at least 2 characters.');
  }
  return await searchMovies(query.trim());
};

export const fetchInitialMovies = async () => {
  // Pick random keywords to make initial load dynamic
  const shuffled = [...SEED_KEYWORDS].sort(() => 0.5 - Math.random());
  const selectedKeywords = shuffled.slice(0, 3);

  const requests = selectedKeywords.map((word) => searchMovies(word).catch(() => []));
  const resultsArray = await Promise.all(requests);

  const combined = resultsArray.flat();

  // Deduplicate by imdbID
  const uniqueMap = new Map();
  combined.forEach((m) => {
    if (m && m.imdbID) uniqueMap.set(m.imdbID, m);
  });

  const uniqueMovies = Array.from(uniqueMap.values());
  // Shuffle array
  return uniqueMovies.sort(() => 0.5 - Math.random()).slice(0, 20);
};