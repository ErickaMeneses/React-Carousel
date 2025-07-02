import './App.css'
import Navbar from './components/Navbar'
import { Carousel } from './pages/Carousel'
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Carousel />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App