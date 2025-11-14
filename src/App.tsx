import './App.css'
import Login from './pages/Login'
import MentorHome from './pages/MentorHome'
import MenteeHome from './pages/MenteeHome'
import CreateProfile from './pages/CreateProfile'
import AccountView from './pages/AccountView'
import MentorProfileView from './pages/MentorProfileView'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//import MentorBoxes from './components/MentorBoxes'
import ChatPage from './pages/ChatPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/mentor-home" element={<MentorHome />} />
          <Route path="/mentee-home" element={<MenteeHome />} />
          <Route path="/chat/:chatId" element={<ChatPage />} />
          <Route path="/view-account" element={<AccountView />} />
          <Route path="/mentor-profile/:mentorId" element={<MentorProfileView />} />
         
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
