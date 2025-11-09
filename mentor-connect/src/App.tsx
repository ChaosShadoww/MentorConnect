import './App.css'
import Login from './pages/Login'
import MentorHome from './pages/MentorHome'
import MenteeHome from './pages/MenteeHome'
import CreateProfile from './pages/CreateProfile'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/mentor-home" element={<MentorHome />} />
          <Route path="/mentee-home" element={<MenteeHome />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
