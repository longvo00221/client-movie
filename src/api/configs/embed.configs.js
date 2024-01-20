const mediaType = {
  movie: "movie",
  tv: "tv",
};

const movieApi = (movieId) => `https://2embed.org/embed/movie?tmdb=${movieId}`;
const tvApi = (tvId, season, episode) =>
  `https://2embed.org/embed/series?tmdb=${tvId}&s=${season}&e=${episode}`;

const embedConfig = {
  mediaType,
  movieApi,
  tvApi,
};
export default embedConfig