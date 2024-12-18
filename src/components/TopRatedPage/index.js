import React from 'react'
import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import NavBar from '../NavBar'
import Pagination from '../Pagination'

import './index.css'

class TopRatedPage extends React.Component {
  state = {
    isLoading: true,
    topRatedMoviesResponse: {},
  }

  componentDidMount() {
    this.getTopRatedMoviesResponse()
  }

  getUpdatedData = response => ({
    totalPages: response.total_pages,
    totalResults: response.total_results,
    results: response.results.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      imageUrl: `https://image.tmdb.org/t/p/w500${eachMovie.poster_path}`,
      rating: eachMovie.vote_average,
    })),
  })

  getTopRatedMoviesResponse = async (page = 1) => {
    const API_KEY = '30e9765903f30aeec2a9bbc114a827e4'
    const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    const response = await fetch(apiUrl)
    const responseData = await response.json()
    const updatedData = this.getUpdatedData(responseData)

    this.setState({isLoading: false, topRatedMoviesResponse: updatedData})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#b32541" />
    </div>
  )

  renderPopularMoviesList = () => {
    const {topRatedMoviesResponse} = this.state
    const {results} = topRatedMoviesResponse

    return (
      <ul className="movies-container">
        {results.map(eachMovie => (
          <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, topRatedMoviesResponse} = this.state

    return (
      <>
        <NavBar />
        <div>
          {isLoading
            ? this.renderLoadingView()
            : this.renderPopularMoviesList()}
        </div>
        <Pagination
          totalPages={topRatedMoviesResponse.totalPages}
          apiCallback={this.getTopRatedMoviesResponse}
        />
      </>
    )
  }
}
export default TopRatedPage
