import { MovieState } from '../hooks/useMovieFetch';
import styled from 'styled-components';
import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';
import Thumb from './Thumb';

const Wrapper = styled.div<{ backdrop: string }>`
  background: ${({ backdrop }) =>
    backdrop ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop})` : '#000'};
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
  animation: animateMovieInfo 1s;
  @keyframes animatedMovieInfo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  @media screen and (max-width: 768px) {
    display: block;
    max-height: none;
  }
`;

const Text = styled.div`
  width: 100%;
  padding: 20px 40px;
  color: var(--white);
  overflow: hidden;
  .rating-directors {
    display: flex;
    justify-content: flex-start;
  }
  .score {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    background: #fff;
    color: #000;
    font-weight: 800;
    border-radius: 50%;
    margin: 0;
  }
  .director {
    margin: 0 0 0 40px;
    p {
      margin: 0;
    }
  }
  h1 {
    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }
`;

interface MoviInfoProps {
  movie: MovieState;
}

const MovieInfo = ({ movie }: MoviInfoProps) => {
  return (
    <>
      <Wrapper backdrop={movie.backdrop_path}>
        <Content>
          <Thumb
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : 'no image'
            }
            clickable={false}
          />
          <Text>
            <h1>{movie.title}</h1>
            <h3>PLOT</h3>
            <p>{movie.overview}</p>

            <div className='rating-directors'>
              <div>
                <h3>RATING</h3>
                <div className='score'>{movie.vote_average}</div>
              </div>
              <div className='director'>
                <h3>DIRECTOR{movie.directors.length > 1 ? 'S' : ''}</h3>
                {movie.directors.map((director) => (
                  <p key={director.credit_id}>{director.name}</p>
                ))}
              </div>
            </div>
          </Text>
        </Content>
      </Wrapper>
    </>
  );
};

export default MovieInfo;
