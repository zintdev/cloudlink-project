import React from 'react';
import { Outlet, Link } from 'react-router-dom'; // Outlet là nơi các trang con (Home, Dashboard) hiển thị

function App() {
  return (
    <div className="App" style={{ padding: '20px' }}>
      
      {/* 1. Thanh điều hướng chung */}
      <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <Link to="/" style={{ marginRight: '15px', fontSize: '18px' }}>Trang chủ (Tạo link)</Link>
        <Link to="/dashboard" style={{ fontSize: '18px' }}>Dashboard (Quản lý)</Link>
      </nav>

      {/* 2. Nơi các trang con (HomePage, DashboardPage) sẽ được "nhét" vào */}
      <main>
        <Outlet />
      </main>

      {/* (Bạn có thể thêm Footer chung ở đây) */}
    </div>
  );
}

export default App;