import AppState from './context/AppState'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/dashboard'
import NotFound from './pages/notfound'
import Chart from './pages/chart'
import Trending from './pages/trending'

function App() {

  return (
    <>
      <AppState>
        <Router>
        <Navbar />
          <div style={{ marginLeft: '76px' }}> {/* Accounts for Navbar width */}
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/chart' element={<Chart />} />
              <Route path='/trending' element={<Trending />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </AppState>
    </>
  )
}

export default App
