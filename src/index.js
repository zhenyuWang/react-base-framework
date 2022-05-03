import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./routes/Home/index.tsx'))
const About = lazy(() => import('./routes/About/index.jsx'))
const Charts = lazy(() => import('./routes/Charts/index.jsx'))
const NotFound = lazy(() => import('./routes/NotFound/index.jsx'))

const createApp = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chart" element={<Charts />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

const root = document.getElementById('root')
ReactDOM.render(createApp(), root)
