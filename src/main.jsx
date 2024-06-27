import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from '@/routes/app.jsx'
import ErrorNotFound from '@/routes/error_not_found.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    errorElement: <ErrorNotFound />,
  },
  {
    path: '/',
    element: <App />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
