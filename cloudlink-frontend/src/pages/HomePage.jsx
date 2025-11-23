import React, { useState } from 'react';
import { createShortLink } from '../services/api';

function HomePage() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortLink, setShortLink] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setShortLink(null);
        setError(null);
        setIsLoading(true);

        try {
            const response = await createShortLink(originalUrl);
            setShortLink(response.data.shortLink);
        } catch (apiError) {
            if (apiError.response && apiError.response.data) {
                setError(apiError.response.data.message || 'URL không hợp lệ.');
            } else {
                setError('Không thể kết nối đến máy chủ. Vui lòng thử lại.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-screen">
            <section className="home-hero">
                <div className="home-heading">
                    <span className="hero-badge">Trải nghiệm rút gọn đẳng cấp</span>
                    <h1>Biến URL dài thành đường dẫn hoàn hảo chỉ trong vài giây</h1>
                    <p>
                        CloudLink giúp bạn rút gọn liên kết, theo dõi hiệu suất và chia sẻ dễ dàng với giao diện
                        hiện đại, mang lại cảm giác chuyên nghiệp cho mọi chiến dịch.
                    </p>
                    <div className="home-stats">
                        <div className="stat-pill">
                            <h3>10K+</h3>
                            <p>Liên kết đã được rút gọn</p>
                        </div>
                        <div className="stat-pill">
                            <h3>3.2s</h3>
                            <p>Thời gian xử lý trung bình</p>
                        </div>
                        <div className="stat-pill">
                            <h3>99.9%</h3>
                            <p>Thời gian hoạt động ổn định</p>
                        </div>
                    </div>
                </div>

                <form className="shortener-form" onSubmit={handleSubmit}>
                    <div className="input-row">
                        <input
                            className="url-input"
                            type="url"
                            placeholder="https://example.com/..."
                            value={originalUrl}
                            onChange={(event) => setOriginalUrl(event.target.value)}
                            required
                        />
                        <button type="submit" className="primary-btn" disabled={isLoading}>
                            {isLoading ? 'Đang xử lý...' : 'Rút gọn ngay'}
                        </button>
                    </div>
                    <span className="form-helper">
                        Dán liên kết bất kỳ (https:// hoặc http://) để tạo đường dẫn ngắn gọn và theo dõi lượt click.
                    </span>
                </form>
            </section>

            {shortLink && (
                <div className="result-card" role="status" aria-live="polite">
                    <strong>Link ngắn của bạn đã sẵn sàng:</strong>
                    <div>
                        <a href={shortLink} target="_blank" rel="noopener noreferrer">
                            {shortLink}
                        </a>
                    </div>
                </div>
            )}

            {error && (
                <div className="error-banner" role="alert">
                    Lỗi: {error}
                </div>
            )}

            <section className="feature-grid">
                <article className="feature-card">
                    <h3>Bảng điều khiển trực quan</h3>
                    <p>Theo dõi lượt click và hiệu suất của từng chiến dịch ngay tức thì.</p>
                </article>
                <article className="feature-card">
                    <h3>Chia sẻ cực nhanh</h3>
                    <p>
                        Link ngắn gọn, dễ nhớ giúp bạn chia sẻ trên mạng xã hội, email hay QR code thật tiện lợi.
                    </p>
                </article>
                <article className="feature-card">
                    <h3>Bảo mật an tâm</h3>
                    <p>Đường dẫn được bảo vệ với hệ thống giám sát và cảnh báo thông minh 24/7.</p>
                </article>
            </section>
        </div>
    );
}

export default HomePage;