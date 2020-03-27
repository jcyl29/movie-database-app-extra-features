import React from 'react';
import { Link } from 'react-router-dom'

const posterPath = 'https://image.tmdb.org/t/p/w500/';

export default class MovieList extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <div className="list-display">
        {list && list.map(movie => {
          const { id, title } = movie;
          return (
            <Link to={`/movie/${id}`} key={id}>
              <img width="225px" src={`${posterPath}${movie.poster_path}`} alt={title} className="movie-poster" />
            </Link>
          );
        })}
     </div>
    );
  }
}
