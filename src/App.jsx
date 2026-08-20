import './App.css'
import HomePage from './pages/homepage/homepage'
import Background from './components/background/background'
import Navbar from './components/navbar/navbar'
import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loading from './components/loading/loading'
import { useState, useCallback,useEffect } from 'react'
import { ThemeProvider } from './context/themecontext/themecontext.jsx'

const MoviePage = React.lazy(() => import('./pages/moviepage/moviepage'))
const WatchlistPageLazy = React.lazy(() => import('./pages/watchlistpage/watchlistpage'))
function App() {
 const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist')

    return saved ? JSON.parse(saved) : []
})
 const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem('favorites')

  return saved ? JSON.parse(saved) : []
})

useEffect(() => {
    localStorage.setItem(
        'watchlist',
        JSON.stringify(watchlist)
    )
}, [watchlist])

useEffect(() => {
  localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])

const watchlisthandler = useCallback((movie) => {
    if (!movie.id) return

    setWatchlist(prev => {
        if (prev.includes(movie.id)) {
            return prev.filter(id => id !== movie.id)
        }

        return [...prev, movie.id]
    })
}, [])

const favoriteHandler = useCallback((movie) => {
  if (!movie?.id) return

  setFavorites(prev => {
    if (prev.includes(movie.id)) {
      return prev.filter(id => id !== movie.id)
    }

    return [...prev, movie.id]
  })
}, [])

  return (
    <ThemeProvider>
    <div className="app-container">
      <BrowserRouter>
        <Background />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={
            <Suspense fallback={<Loading />}>
              <MoviePage 
                watchlisthandler={watchlisthandler} 
                watchlist={watchlist} 
                favoriteHandler={favoriteHandler}
                favorites={favorites}
              />
            </Suspense>
          } />
          <Route path="/watchlist" element={
            <Suspense fallback={<Loading />}>
              <WatchlistPageLazy 
                watchlist={watchlist} 
                setWatchlist={setWatchlist} 
              />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </div>
    </ThemeProvider>
  )
}

export default App