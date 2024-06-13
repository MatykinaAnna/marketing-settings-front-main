import './app.scss'
import MarcetingProgram from '../pages/marcetingProgram/ui/MarcetingProgram'
import MagazinesOfMP from '../pages/magazinesOfMP/ui/magazinesOfMP'
import Price from 'pages/price/ui/price'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/market/settings" element={<MarcetingProgram />} />
        <Route path="/market/" element={<MagazinesOfMP />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
