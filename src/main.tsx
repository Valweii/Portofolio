import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import { Routes, Route } from "react-router"
import { lazy, Suspense } from "react"

const Home = lazy(() => import("./page/Home"))
const Projects = lazy(() => import("./page/Projects"))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div className='bg-sage w-full h-screen'></div>}>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
