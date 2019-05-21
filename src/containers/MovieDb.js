import { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'es6-promise-debounce';

const debounceAxiosGet = debounce(axios.get, 1000);

const useMovieSearch = query => {
  const [movies, setMovies] = useState({ results: [], error: null });

  useEffect(() => {
    (async function() {
      try {
        const res = await debounceAxiosGet(
          'https://api.themoviedb.org/3/search/movie',
          {
            params: {
              api_key: 'a0acf48d85383e412e1e53f18b225c6a',
              query
            }
          }
        );
        setMovies({ results: res.data.results, error: null });
      } catch (error) {
        setMovies({ results: [], error });
      }
    })();
  }, [query]);

  if (movies.error) {
    throw movies.error;
  }

  return movies.results;
};

export const Movies = ({ query, children }) => {
  const movies = useMovieSearch(query);
  return children(movies);
};
