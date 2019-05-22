import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Normalize, Grid, Typography } from '@smooth-ui/core-sc';

import SearchInput from './components/SearchInput';
import { Movies } from './containers/MovieDb';
import Catch from './components/Catch';
import MovieCard from './components/MovieCard';
import { T, useI18n } from './components/I18n';

function App() {
  const [query, setQuery] = useState('Lord of the ring');
  const catchRef = useRef();
  const searchInputRef = useRef();
  const { setLocale, locale } = useI18n();
  // Si on est en français, on voudra passer en anglais et inversement
  const otherLocale = locale === 'fr' ? 'en' : 'fr';
  useEffect(() => {
    catchRef.current.retry();
  }, [query]);
  useEffect(() => searchInputRef.current.focus(), [searchInputRef]);

  return (
    <>
      {/* The "Grid" component centers the child in the page, "py" means "padding-top" and "padding-bottom" */}
      <Grid py={200}>
        {/* Normalize the CSS output between the different browsers */}
        <Normalize />
        <button my={1} onClick={() => setLocale(otherLocale)}>
          <T id={otherLocale} />
        </button>
        {/* a "Typography" composant with ready to use variants */}
        <Typography variant="display-1">
          <T id="title" />
        </Typography>
        <SearchInput
          ref={searchInputRef}
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
