import React, { useState, useEffect } from 'react';
import { getAllLinks } from '../services/api';
import { Link } from 'react-router-dom';

const normalizeLinksResponse = (payload) => {
    if (Array.isArray(payload)) {
        return payload;
    }
    if (payload && Array.isArray(payload.content)) {
        return payload.content;
    }
    if (payload && Array.isArray(payload.links)) {
        return payload.links;
    }
    return [];
};

function DashboardPage() {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await getAllLinks();
                setLinks(normalizeLinksResponse(response.data));
            } catch (err) {
                setError('Không thể tải dữ liệu dashboard.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLinks();
    }, []);

    const safeLinks = Array.isArray(links) ? links : [];
    const totalClicks = safeLinks.reduce((sum, link) => sum + (link.clickCount || 0), 0);
    const averageClicks = safeLinks.length ? Math.round(totalClicks / safeLinks.length) : 0;
    const topLink = safeLinks.reduce((best, current) => {
        if (!best) {
            return current;
        }
        return (current.clickCount || 0) > (best.clickCount || 0) ? current : best;
    }, null);

    const formatOriginalUrl = (url) => {
        if (!url) {
            return '';
        }
        return url.length > 70 ? `${url.slice(0, 67)}...` : url;
    };

    const trimProtocol = (url) => {
        if (!url) {
            return '';
        }
        return url.replace(/^https?:\/\//, '');
    };

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div>
                    <span className="dashboard-eyebrow">CloudLink Analytics</span>
                    <h1>Tổng quan hiệu suất liên kết</h1>
                    <p>
                        Theo dõi mọi chiến dịch, xác định liên kết hoạt động tốt nhất và đưa ra quyết định dựa trên dữ
                        liệu chính xác.
                    </p>
                </div>
                <Link className="ghost-btn" to="/">
                    + Tạo link mới
                </Link>
            </header>

            <section className="metrics-grid">
                <article className="metric-card">
                    <span className="metric-label">Tổng liên kết</span>
                    <span className="metric-value">{safeLinks.length}</span>
                    <span className="metric-sub">Đang được quản lý trên hệ thống</span>
                </article>
                <article className="metric-card">
                    <span className="metric-label">Tổng lượt click</span>
                    <span className="metric-value">{totalClicks}</span>
                    <span className="metric-sub">Tương tác được ghi nhận trên CloudLink</span>
                </article>
                <article className="metric-card">
                    <span className="metric-label">Click trung bình/link</span>
                    <span className="metric-value">{averageClicks}</span>
                    <span className="metric-sub">Hiệu suất trung bình cho mỗi liên kết</span>
                </article>
                <article className="metric-card">
                    <span className="metric-label">Liên kết nổi bật</span>
                      <span className="metric-value">{topLink ? topLink.clickCount || 0 : '--'}</span>
                    <span className="metric-sub">
                        {topLink ? (
                            <a href={topLink.shortLink} target="_blank" rel="noopener noreferrer">
                                {trimProtocol(topLink.shortLink)}
                            </a>
                        ) : (
                            'Chưa có dữ liệu'
                        )}
                    </span>
                </article>
            </section>

            <div className="data-table-wrapper">
                {isLoading ? (
                    <div className="empty-state">Đang tải dashboard...</div>
                ) : error ? (
                    <div className="empty-state" role="alert">
                        {error}
                    </div>
                ) : safeLinks.length === 0 ? (
                    <div className="empty-state">
                        Chưa có liên kết nào được tạo. Hãy bắt đầu với CloudLink ngay hôm nay!
                    </div>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Link ngắn</th>
                                <th>Link gốc</th>
                                <th>Lượt click</th>
                            </tr>
                        </thead>
                        <tbody>
                            {safeLinks.map((link) => (
                                <tr key={link.id}>
                                    <td>
                                        <a href={link.shortLink} target="_blank" rel="noopener noreferrer">
                                            {trimProtocol(link.shortLink)}
                                        </a>
                                    </td>
                                    <td>{formatOriginalUrl(link.originalUrl)}</td>
                                    <td>{link.clickCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;