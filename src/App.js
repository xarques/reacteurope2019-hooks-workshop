import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Normalize, Grid, Typography } from '@smooth-ui/core-sc';

import SearchInput from './components/SearchInput';
import { Movies } from './containers/MovieDb';
import Catch from './components/Catch';
import MovieCard from './components/MovieCard';

function App() {
  const [query, setQuery] = useState('Lord of the ring');
  const catchRef = useRef();

  useEffect(() => {
    catchRef.current.retry();
  }, [query]);

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
        <Catch ref={catchRef}>
          <Row>
            <Movies query={query}>
              {movies =>
                movies
                  .filter(movie => movie.backdrop_path)
                  .map(movie => (
                    <Col my={1} xs={12} md={6} key={movie.id}>
                      <MovieCard movie={movie} />
                    </Col>
                  ))
              }
            </Movies>
          </Row>
        </Catch>
      </Grid>
    </>
  );
}

export default App;
