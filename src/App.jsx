import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Review from './pages/Review';
import Nav from './components/Nav'
import Footer from './components/Footer' // Add this import

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/review" element={<Review />} />
            {/* Comment out routes for pages you don't have yet */}
            {/* <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Routes>
          <Footer /> {/* Add Footer back */}
        </div>
      </Router>
    </ThemeProvider>
  )
}
export default App