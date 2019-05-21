import { useEffect, useReducer } from 'react';
import axios from 'axios';
import debounce from 'es6-promise-debounce';

const debounceAxiosGet = debounce(axios.get, 1000);

const initialState = { results: [], error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES':
      return { results: action.payload, error: null };
    case 'EMPTY_MOVIES':
      return { results: [], error: null };
    case 'ERROR':
      return { results: [], error: action.payload };
    default:
      return state;
  }
};

const useMovieSearch = query => {
  const [movies, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!query) {
      dispatch({ type: 'EMPTY_MOVIES' });
      return;
    }
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
        dispatch({ type: 'FETCH_MOVIES', payload: res.data.results });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: error });
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
