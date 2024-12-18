import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'

import PopularPage from './components/PopularPage'
import TopRatedPage from './components/TopRatedPage'
import UpcomingPage from './components/UpcomingPage'
import SearchPage from './components/SearchPage'

import MoviesContext from './context/MoviesContext'

import './App.css'
const API_KEY = '30e9765903f30aeec2a9bbc114a827e4'

// write your code here
const App = () => {
  const [searchResponse, setSearchResponse] = useState({})
  const [apiStatus, setApiStatus] = useState('INITIAL')
  const [searchInput, setSearchInput] = useState('')

  const onChangeSearchInput = text => setSearchInput(text)

  const getUpdatedData = response => ({
    totalPages: response.total_pages,
    totalResults: response.total_results,
    results: response.results.map(eachMovie => ({
      id: eachMovie.id,
      title: eachMovie.title,
      imageUrl: eachMovie.imageUrl,
      rating: eachMovie.rating,
    })),
  })

  const onTriggerSearch = async (page = 1) => {
    setApiStatus('IN_PROGRESS')
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1`

    const response = await fetch(apiUrl)
    const data = await response.json()
    setSearchResponse(getUpdatedData(data))
    setApiStatus('SUCCESS')
  }

  return (
    <MoviesContext.Provider
      value={{
        searchResponse,
        apiStatus,
        onTriggerSearch,
        searchInput,
        onChangeSearchInput,
      }}
    >
      <div className="App d-flex flex-column">
        <Switch>
          <Route exact path="/" component={PopularPage} />
          <Route exact path="/top-rated" component={TopRatedPage} />
          <Route exact path="/upcoming" component={UpcomingPage} />
          <Route exact path="/search" component={SearchPage} />
        </Switch>
      </div>
    </MoviesContext.Provider>
  )
}

export default App
