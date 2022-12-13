import { useEffect, useState } from 'react';
import apiSettings from '../api';
import { isPersistedState } from '../utils';

export type MovieState = IMovie & { actors: ICast[]; directors: ICrew[] };

export const useMovieFetch = (movieId: string) => {
  const [state, setState] = useState<MovieState>({} as MovieState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(false);
        const movie = await apiSettings.fetchMovie(movieId);
        const credits = await apiSettings.fetchCredits(movieId);
        const directors = credits.crew.filter((m) => m.job === 'Director');

        setState({
          ...movie,
          actors: credits.cast,
          directors,
        });

        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
      }
    };

    const sessionState = isPersistedState(movieId);

    if (sessionState) {
      setState(sessionState);
      setLoading(false);
      return;
    }

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    sessionStorage.setItem(movieId, JSON.stringify(state));
  }, [movieId, state]);

  return { state, loading, error };
};
