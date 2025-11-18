import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar">
        <NavLink to="/" className="nav-brand">
          <span>CL</span>
          CloudLink
        </NavLink>
        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
            end
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
          >
            Dashboard
          </NavLink>
        </div>
      </nav>

      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export default App;