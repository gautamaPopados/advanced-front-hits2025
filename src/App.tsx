import './App.css'
import LoginPage from './components/pages/Authentification/LoginPage'
import { Route, Routes } from 'react-router-dom'
import EventsPage from './components/pages/Events/EventsPage'
import { AuthProvider } from './api/providers/auth-provider'
import { ToastProvider } from './api/providers/toast-provider'
function App() {

  return (
    <>
      <ToastProvider />
      <AuthProvider>
         <Routes>
            <Route path="/" element={<EventsPage />} />
            <Route path="/login" element={<LoginPage />} />
         </Routes>
      </AuthProvider>
      </>
  )
}

export default App
