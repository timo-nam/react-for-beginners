import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();

    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} />
          <h1>
            {movie.title}, {movie.year}
          </h1>
          <h2>Rating: {movie.rating}</h2>
          <h3>
            {movie.genres.map((g) => (
              <span key={g}>{g} </span>
            ))}
            | {movie.language} | {movie.runtime} min
          </h3>
          <hr />
          <p>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;
