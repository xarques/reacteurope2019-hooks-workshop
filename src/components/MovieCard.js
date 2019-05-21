import React from 'react';

import Card from './Card';

const MovieCard = ({ movie }) => {
  return (
    <Card
      style={{
        height: 200,
        backgroundImage: movie.backdrop_path
          ? `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`
          : null
      }}
    >
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Subtitle>
          {movie.vote_average} ({movie.vote_count} votes)
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
