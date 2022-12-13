import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiSettings from '../api';
import {
  Actor,
  BreadCrumb,
  Grid,
  MovieInfo,
  MovieInfobar,
  Spinner,
} from '../components';
import { useMovieFetch } from '../hooks/useMovieFetch';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';

interface recommnedProps {
  success: boolean;
  msg: string;
  data: string | string[];
}

const MovieDetail = () => {
  const { movieId } = useParams();
  const [recommend, setRecommend] = useState<recommnedProps>({
    success: false,
    msg: '',
    data: '',
  });
  const { state: movie, loading, error } = useMovieFetch(movieId as string);

  useEffect(() => {
    const recommendFetch = async () => {
      setRecommend(await apiSettings.getRecommend(movie.title));
    };

    if (!error) recommendFetch();
  }, [loading]);

  if (loading) return <Spinner />;
  if (error) return <div>errors...</div>;

  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <MovieInfo movie={movie} />
      <MovieInfobar
        time={movie.runtime}
        budget={movie.budget}
        revenue={movie.revenue}
      />
      <Grid header='Actors'>
        {movie.actors.map((actor) => (
          <Actor
            key={actor.credit_id}
            name={actor.name}
            character={actor.character}
            imageURL={
              actor.profile_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                : 'no image'
            }
          />
        ))}
        {/* {recommend?.success ? 'done' : ''} */}
      </Grid>
    </>
  );
};

export default MovieDetail;
