import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Services from './pages/Services'
import Login from './pages/Login'
import Register from './pages/Register'
import Booking from './pages/Booking'
import Review from './pages/Review'
import Confirmation from './pages/Confirmation'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/booking/:serviceId"
          element={<Booking />}
        />

        <Route
          path="/review"
          element={<Review />}
        />

        <Route
          path="/confirmation"
          element={<Confirmation />}
        />
      </Routes>
    </>
  )
}

export default App