import { useEffect, useState } from 'react';
import apiSettings from '../api';
import { isPersistedState } from '../utils';

export type MovieState = IMovie & { actors: ICast[]; directors: ICrew[] };

export const useMovieFetch = (movieIds: string[]) => {
  const [state, setState] = useState<MovieState[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        movieIds.forEach(async (movieId: string) => {
          const movie = await apiSettings.fetchMovie(movieId);
          const credits = await apiSettings.fetchCredits(movieId);
          const directors = credits.crew.filter((m) => m.job === 'Director');

          setState([
            {
              ...movie,
              actors: credits.cast,
              directors,
            },
          ]);
        });

        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
      }
    };

    const sessionState = isPersistedState('recommend');

    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieIds]);

  useEffect(() => {
    sessionStorage.setItem('recommend', JSON.stringify(state));
  }, [movieIds, state]);

  return { state, loading, error };
};
