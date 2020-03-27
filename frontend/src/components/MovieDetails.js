import React, { useEffect, useState } from 'react';
import { IMG_API } from '../constants';

export default (props) => {
  const movieId = props.match.params[0];
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setIsLoading] = useState(true);

  const getMovieDetails = async () => {
    const response = await fetch(`http://localhost:5000/api/movie/${movieId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const movieDetailsJson = await response.json();

    setIsLoading(false)
    setMovieDetails(movieDetailsJson);
  };

  useEffect(() => {
    getMovieDetails();
  }, [movieId]);

  const {
    title,
    backdrop_path: poster,
    release_date,
    overview: synopsis,
  } = movieDetails;

  return (
    <div className="movie-details">
{loading
        && <div style={{position:'absolute', width: "200px", backgroundColor: "red", height: "200px", top: "50%", left: "50%", textAlign: "center", transform:"translate(-50%, 50%"}}>Loading...</div>}
      <h1 className="movie-details-title">{title}</h1>

      <div className="poster">
        {poster && <img className="poster" src={`${IMG_API}${poster}`} alt={`${title}-poster`} />}
      </div>

      <div className="info">
        <h1>Synopsis:</h1>
        <p>{synopsis}</p>

        <h1>Released:</h1>
        <p>{release_date}</p>
      </div>
    </div>
  );
};
