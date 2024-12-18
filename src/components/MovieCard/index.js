import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, imageUrl, rating} = movieDetails

  return (
    <li className="movie-card-container">
      <img className="movie-card-image" alt={title} src={imageUrl} />
      <div className="movie-details">
        <h1 className="movie-title">{title}</h1>
        <p className="movie-rating">Rating: {rating}</p>
      </div>
      <Link to={`/movies/${id}`} className="view-details">
        <button className="view-details-button" type="button">
          View Details
        </button>
      </Link>
    </li>
  )
}
export default MovieCard
