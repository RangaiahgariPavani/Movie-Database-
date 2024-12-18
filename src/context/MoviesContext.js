import {createContext} from 'react'

const MoviesContext = createContext({
  searchResponse: {},
  onTriggerSearch: () => {},
})

export default MoviesContext