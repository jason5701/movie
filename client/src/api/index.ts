import * as config from '../utils/config';

const defaultConfig = {
  method: 'POST',
  Headers: {
    'Content-type': 'application/json',
  },
};

const apiSettings = {
  fetchMovies: async (searchTerm: string, page: number): Promise<IMovies> => {
    const endpoint: string = searchTerm
      ? `${config.SEARCH_BASE_URL}${searchTerm}&page=${page}`
      : `${config.POPULAR_BASE_URL}&page=${page}`;

    return await (await fetch(endpoint)).json();
  },

  fetchMovie: async (movieId: string): Promise<IMovie> => {
    const endpoint: string = `${config.API_URL}movie/${movieId}?api_key=${config.API_KEY}`;

    return await (await fetch(endpoint)).json();
  },

  fetchCredits: async (movieId: string): Promise<ICredits> => {
    const creditsEndPoint: string = `${config.API_URL}movie/${movieId}/credits?api_key=${config.API_KEY}`;

    return await (await fetch(creditsEndPoint)).json();
  },

  getRequestToken: async () => {
    const reqToken = await (await fetch(config.REQUEST_TOKEN_URL)).json();

    return reqToken.request_token;
  },

  authenticate: async (
    requestToken: string,
    username: string,
    password: string
  ) => {
    const bodyData = {
      username,
      password,
      request_token: requestToken,
    };

    const data = await (
      await fetch(config.LOGIN_URL, {
        ...defaultConfig,
        body: JSON.stringify(bodyData),
      })
    ).json();

    if (data.success) {
      const sessionId = await (
        await fetch(config.SESSION_ID_URL, {
          ...defaultConfig,
          body: JSON.stringify({ request_token: requestToken }),
        })
      ).json();

      return sessionId;
    }
  },
  //@ts-ignore
  rateMovie: async (sessionId, movieId, value) => {
    const endpoint = `${config.API_URL}movie/${movieId}/rating?api_key=${config.API_KEY}&session_id=${sessionId}`;

    const rating = await (
      await fetch(endpoint, {
        ...defaultConfig,
        body: JSON.stringify({ value }),
      })
    ).json();

    return rating;
  },

  getRecommend: async (moviename: string) => {
    const endpoint = `${config.RECOMMEND_URL}?name=${moviename}`;
    if (moviename !== undefined) return await (await fetch(endpoint)).json();
  },
};

export default apiSettings;
