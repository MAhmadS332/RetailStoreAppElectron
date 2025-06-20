import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

//custom imports
import Sidebar from './components/shared/Sidebar'
import Items from './pages/Items'
import Settings from './pages/Settings'
import Categories from './pages/Categories'
import DraftedOrders from './pages/DraftedOrders'
import Taskboard from './pages/Taskboard'
import SavedOrders from './pages/SavedOrders'
import Register from './pages/Register'
import Orders from './pages/Orders'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

//fix redux additions

function App() {
  const settings = useSelector((state) => state.settings.value)

  useEffect(() => {
    const darkTheme = settings[5].setting_value === 'true' ? true : false
    const theme = darkTheme ? 'dark' : 'light'
    console.log('Changing Theme', theme)
    document.getElementsByTagName('html')[0].className = theme
  }, [settings])

  useEffect(() => {
    const fontSize = settings[6].setting_value || '100'
    window.api.setZoom(fontSize)
  }, [])

  return (
    <HashRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 500,
          style: {
            animation: 'none',
            background: 'var(--highlight)',
            color: 'var(--header-text)',
            border: 'var(--accent)',
            fontSize: '14px',
            padding: '4px 6px',
            borderRadius: '8px'
          },
          success: {
            iconTheme: {
              primary: '#22c55e', // green-500
              secondary: '#ecfdf5'
            }
          },
          error: {
            iconTheme: {
              primary: '#ef4444', // red-500
              secondary: '#fee2e2'
            }
          }
        }}
      />
      <Sidebar />
      <Routes>
        <Route exact path="/items" element={<Items />} />
        <Route exact path="/categories" element={<Categories />} />
        <Route exact path="/drafted-orders" element={<DraftedOrders />} />
        <Route exact path="/taskboard" element={<Taskboard />} />
        <Route exact path="/saved-orders" element={<SavedOrders />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/" element={<Orders />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  )
}

export default App
