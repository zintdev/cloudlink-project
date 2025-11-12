package com.zintdev.cloudlink_backend.service;

import org.springframework.stereotype.Service;

import com.zintdev.cloudlink_backend.domain.entity.Click;
import com.zintdev.cloudlink_backend.domain.entity.ShortLink;
import com.zintdev.cloudlink_backend.repository.ClickRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final ClickRepository clickRepository;

    /**
     * Ghi lại một lượt click.
     * @param shortLink Entity ShortLink mà người dùng vừa click vào.
     * @param request   Đối tượng HttpServletRequest để lấy IP và User-Agent.
     */
    public void logClick(ShortLink shortLink, HttpServletRequest request) {
        Click newClick = new Click();
        
        // Gán click này cho link rút gọn tương ứng
        newClick.setShortLink(shortLink); 
        
        // Lấy thông tin từ request
        newClick.setIpAddress(getClientIp(request));
        newClick.setUserAgent(request.getHeader("User-Agent"));

        // (Lưu ý: clickedAt đã được tự động set bằng @PrePersist trong Entity)

        // Lưu vào CSDL
        clickRepository.save(newClick);
    }

    // Hàm tiện ích để lấy IP của người dùng,
    // kể cả khi họ đứng sau một proxy (như Load Balancer của AWS)
    private String getClientIp(HttpServletRequest request) {
        String remoteAddr = "";
        if (request != null) {
            remoteAddr = request.getHeader("X-FORWARDED-FOR");
            if (remoteAddr == null || "".equals(remoteAddr)) {
                remoteAddr = request.getRemoteAddr();
            }
        }
        return remoteAddr;
    }
}