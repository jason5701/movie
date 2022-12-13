declare global {
  namespace NodeJS {
    interface Global {
      recommendations: JSON;
      similarUsers: JSON;
      dissimilarMovies: JSON;
    }
  }
}
