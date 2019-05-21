import { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'es6-promise-debounce';

const debounceAxiosGet = debounce(axios.get, 1000);

export const useMovieSearch = query => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async function() {
      const res = await debounceAxiosGet(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: {
            api_key: 'a0acf48d85383e412e1e53f18b225c6a',
            query
          }
        }
      );
      setMovies(res.data.results);
    })();
  }, [query]);

  return movies;
};
