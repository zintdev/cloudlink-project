import React, { useState } from 'react';
import { createShortLink } from '../services/api'; // Import hàm API vừa tạo

function HomePage() {
    // State để lưu link gốc (ô input)
    const [originalUrl, setOriginalUrl] = useState('');
    
    // State để lưu kết quả (link ngắn)
    const [shortLink, setShortLink] = useState(null);
    
    // State cho thông báo lỗi
    const [error, setError] = useState(null);
    
    // State cho trạng thái loading (đang gọi API)
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        // Ngăn trình duyệt tự reload trang khi submit form
        e.preventDefault(); 
        
        // Reset trạng thái cũ
        setShortLink(null);
        setError(null);
        setIsLoading(true);

        try {
            // **Đây là lúc gọi API!**
            const response = await createShortLink(originalUrl);
            
            // Lấy dữ liệu từ response
            setShortLink(response.data.shortLink);
            
        } catch (apiError) {
            // Xử lý lỗi (vd: URL không hợp lệ)
            if (apiError.response && apiError.response.data) {
                // Lỗi từ Spring Validation (400 Bad Request)
                setError(apiError.response.data.message || 'URL không hợp lệ.');
            } else {
                // Lỗi mạng hoặc backend sập
                setError('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
            }
        } finally {
            // Dù thành công hay thất bại, cũng dừng loading
            setIsLoading(false); 
        }
    };

    return (
        <div>
            <h1>CloudLink URL Shortener</h1>
            <p>Nhập link dài của bạn để rút gọn:</p>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="https://example.com/..."
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                    style={{ width: '300px', marginRight: '10px' }}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Đang xử lý...' : 'Rút gọn'}
                </button>
            </form>

            {/* Hiển thị kết quả nếu thành công */}
            {shortLink && (
                <div style={{ marginTop: '20px', backgroundColor: '#e6f7ff', padding: '10px' }}>
                    <p>Link ngắn của bạn:</p>
                    <a href={shortLink} target="_blank" rel="noopener noreferrer">
                        {shortLink}
                    </a>
                </div>
            )}

            {/* Hiển thị lỗi nếu thất bại */}
            {error && (
                <div style={{ marginTop: '20px', color: 'red' }}>
                    <p>Lỗi: {error}</p>
                </div>
            )}
        </div>
    );
}

export default HomePage;