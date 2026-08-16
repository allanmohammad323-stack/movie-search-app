import './App.css'
import HomePage from './pages/homepage/homepage'
import Background from './components/background/background'
import Navbar from './components/navbar/navbar'
import React,{ Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loading from './components/loading/loading'

function App() {
  const MoviePage = React.lazy(() => import('./pages/moviepage/moviepage'))
  return (
    <div className="app-container">
    <BrowserRouter>
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={
          <Suspense fallback={<Loading />}>
            <MoviePage />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App