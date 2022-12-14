import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  max-width: 720px;
  transition: all 0.3s;
  object-fit: cover;
  border-radius: 20px;
  animation: animateThumb 0.5s;
  :hover {
    opacity: 0.8;
  }
  @keyframes animateThumb {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

interface ThumbProps {
  image: string;
  movieId?: number;
  clickable: boolean;
}

const Thumb = ({ image, movieId, clickable }: ThumbProps) => {
  return (
    <div>
      {clickable ? (
        <Link to={`/${movieId}`}>
          <Image src={image} alt='movie_thumb' />
        </Link>
      ) : (
        <Image src={image} alt='movie_thumb' />
      )}
    </div>
  );
};

export default Thumb;
