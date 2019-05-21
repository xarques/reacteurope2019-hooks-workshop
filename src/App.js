import React, { useState, useEffect } from 'react';
import { Normalize, Grid, Typography } from '@smooth-ui/core-sc';
import axios from 'axios';
import debounce from 'es6-promise-debounce';

import SearchInput from './components/SearchInput';

const debounceAxiosGet = debounce(axios.get, 1000);

function App() {
  const [query, setQuery] = useState('Lord of the ring');
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
  }, [movies, query]);

  return (
    <>
      {/* The "Grid" component centers the child in the page, "py" means "padding-top" and "padding-bottom" */}
      <Grid py={200}>
        {/* Normalize the CSS output between the different browsers */}
        <Normalize />
        {/* a "Typography" composant with ready to use variants */}
        <Typography variant="display-1">Smooth Movie</Typography>
        <SearchInput
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <p>Search : {query}</p>
        <p>Results : </p>
        <ul>
          {movies.map(({ id, title }) => (
            <li key={id}>{title}</li>
          ))}
        </ul>
      </Grid>
    </>
  );
}

export default App;
