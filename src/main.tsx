import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Grocery from './Grocery.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Grocery />
  </StrictMode>,
)