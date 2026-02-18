import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppRouter from './routes/AppRouter'

function App() {
  return function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
}

export default App
