import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import MainPage from "./pages/MainPage"
import AboutPage from "./pages/AboutPage"
import './App.css'

function App() {
  return (
    <Router>
      

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  )
}

export default App
