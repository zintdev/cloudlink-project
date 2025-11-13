import React, { useState, useEffect } from 'react';
import { getAllLinks } from '../services/api';
import { Link } from 'react-router-dom'; // Để tạo link điều hướng

function DashboardPage() {
    const [links, setLinks] = useState([]); // Mảng chứa tất cả link
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Dùng useEffect để gọi API khi component được tải
    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await getAllLinks();
                setLinks(response.data); // Lưu mảng link vào state
            } catch (err) {
                setError('Không thể tải dữ liệu dashboard.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLinks();
    }, []); // Dấu [] nghĩa là chỉ chạy 1 lần

    if (isLoading) {
        return <p>Đang tải dashboard...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/">Quay về trang chủ</Link>

            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Link ngắn</th>
                        <th style={tableHeaderStyle}>Link gốc (Rút gọn)</th>
                        <th style={tableHeaderStyle}>Lượt click</th>
                    </tr>
                </thead>
                <tbody>
                    {links.map((link) => (
                        <tr key={link.id}>
                            <td style={tableCellStyle}>
                                <a href={link.shortLink} target="_blank" rel="noopener noreferrer">
                                    {link.shortLink.replace('http://my-domain.com/', '')}
                                </a>
                            </td>
                            <td style={tableCellStyle}>
                                {link.originalUrl.substring(0, 50)}...
                            </td>
                            <td style={tableCellStyle}>
                                {link.clickCount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// (CSS đơn giản)
const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2'
};

const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left'
};

export default DashboardPage;