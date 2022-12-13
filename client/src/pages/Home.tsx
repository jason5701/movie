import {
  Button,
  Grid,
  Searchbar,
  Spinner,
  Thumb,
  TopImage,
} from '../components';
import { useHomeFetch } from '../hooks/useHomeFetch';
import { BACKDROP_SIZE, IMAGE_BASE_URL, POSTER_SIZE } from '../utils/config';

const Home = () => {
  const {
    state,
    isLoading,
    isError,
    searchTerm,
    setSearchTerm,
    setIsLoadingMore,
  } = useHomeFetch();

  if (isError) return <div>Error...</div>;
  return (
    <>
      {!searchTerm && state.results[0] ? (
        <TopImage
          image={``}
          // image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
          title={state.results[0].title}
          text={state.results[0].overview}
        />
      ) : null}
      <Searchbar setSearchTerm={setSearchTerm} />
      <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
        {state.results.map((movie) => (
          <Thumb
            key={movie.id}
            clickable
            image={
              // movie.poster_path
              //   ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
              //   :
                 ''
            }
            movieId={movie.id}
          />
        ))}
      </Grid>
      {isLoading && <Spinner />}
      {state.page < state.total_pages && !isLoading && (
        <Button callback={() => setIsLoadingMore(true)}>더보기</Button>
      )}
    </>
  );
};

export default Home;
