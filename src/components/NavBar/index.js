import {Link, withRouter} from 'react-router-dom'

import MoviesContext from '../../context/MoviesContext'

import './index.css'

const NavBar = props => {
  const renderSearchBar = () => (
    <MoviesContext.Consumer>
      {value => {
        const {onTriggerSearch, onChangeSearchInput, searchInput, apiStatus} =
          value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)
        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearch()
          history.push('./search')
        }

        return (
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              onChange={onChangeHandler}
              value={searchInput}
              placeholder="Search"
            />
            <button className="button" type="button" onClick={onSearchHandler}>
              Search
            </button>
          </div>
        )
      }}
    </MoviesContext.Consumer>
  )

  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <h1 className="page-logo">movieDB</h1>
      </div>
      <div className="nav-items-container">
        <ul className="nav-items-list">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Popular
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/top-rated">
              Top Rated
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/upcoming">
              Upcoming
            </Link>
          </li>
        </ul>
        {renderSearchBar()}
      </div>
    </nav>
  )
}
export default withRouter(NavBar)
