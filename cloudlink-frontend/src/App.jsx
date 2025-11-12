import React from 'react';
import HomePage from './pages/HomePage'; // Import trang vừa tạo
import './App.css'; // (Bạn có thể xoá file .css này nếu muốn)

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* Chỉ hiển thị trang HomePage */}
                <HomePage />
            </header>
        </div>
    );
}

export default App;