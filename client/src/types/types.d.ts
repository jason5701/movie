declare interface IMovie {
  backdrop_path: string;
  id: number;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  title: string;
  vote_average: number;
  budget: number;
  runtime: number;
  revenue: number;
}

declare interface IMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

declare interface ICast {
  character: string;
  credit_id: string;
  name: string;
  profile_path: string;
}

declare interface ICrew {
  job: string;
  name: string;
  credit_id: number;
}

declare interface ICredits {
  id: number;
  cast: ICast[];
  crew: ICrew[];
}
