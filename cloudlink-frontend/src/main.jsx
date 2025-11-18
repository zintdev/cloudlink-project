import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App' // 'App' sẽ là layout chung
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import './index.css';

// Cấu hình Router
const router = createBrowserRouter([
  {
    path: "/",         // URL gốc
    element: <App />,  // Dùng App làm layout chung
    children: [
      {
        path: "/",     // Khi URL là "/"
        element: <HomePage />, // Hiển thị trang Home
      },
      {
        path: "/dashboard", // Khi URL là "/dashboard"
        element: <DashboardPage />, // Hiển thị trang Dashboard
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)