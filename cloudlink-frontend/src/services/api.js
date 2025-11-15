import axios from 'axios';

// Cấu hình URL cơ sở cho Backend.
// React (chạy ở 5173) sẽ gọi Backend (chạy ở 8080)
// force update
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Tạo một "instance" của axios
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Gọi API POST /api/v1/links để tạo link ngắn
 * @param {string} originalUrl - Link gốc người dùng nhập vào
 * @returns {Promise<object>} - Dữ liệu trả về từ API (gồm shortLink, originalUrl)
 */
export const createShortLink = (originalUrl) => {
    // Dữ liệu gửi đi, khớp với DTO CreateLinkRequest
    const payload = {
        originalUrl: originalUrl 
    };
    
    // Trả về một Promise
    return apiClient.post('/api/v1/links', payload);
};

/**
 * Gọi API GET /api/v1/links để lấy tất cả link
 * @returns {Promise<Array>} - Một mảng các link (với clickCount)
 */
export const getAllLinks = () => {
    return apiClient.get('/api/v1/links');
};

// (Trong tương lai, chúng ta sẽ thêm các hàm khác vào đây)
// export const getLinkStats = (shortCode) => ...