package com.zintdev.cloudlink_backend.controller;

import java.net.URI;

import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.zintdev.cloudlink_backend.domain.entity.ShortLink;
import com.zintdev.cloudlink_backend.repository.ShortLinkRepository;
import com.zintdev.cloudlink_backend.service.AnalyticsService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Controller // Dùng @Controller, KHÔNG phải @RestController
@RequiredArgsConstructor
public class RedirectController {

    private final ShortLinkRepository shortLinkRepository;
    private final AnalyticsService analyticsService;

    // Endpoint: GET /AbC12
    @GetMapping("/{shortCode}")
    public ResponseEntity<Void> redirect(
            @PathVariable("shortCode") String shortCode,
            HttpServletRequest request
    ) {
        // **Nghiệp vụ 2: Tra cứu**
        // Dùng hàm findByShortCode ta đã tạo ở Feature #1
        Optional<ShortLink> linkOptional = shortLinkRepository.findByShortCode(shortCode);

        if (linkOptional.isPresent()) {
            ShortLink link = linkOptional.get();

            // **Nghiệp vụ 2 (Analytics): Ghi lại lượt click**
            // Chạy bất đồng bộ để không làm chậm việc redirect
            // (Tối ưu đơn giản, không cần thread pool phức tạp vội)
            new Thread(() -> analyticsService.logClick(link, request)).start();

            // **Nghiệp vụ 2: Chuyển hướng**
            // Trả về mã 302 (Found) để trình duyệt tự động chuyển hướng
            return ResponseEntity
                    .status(HttpStatus.FOUND) // Mã 302
                    .location(URI.create(link.getOriginalUrl())) // Tới link gốc
                    .build();

        } else {
            // **Không tìm thấy link**
            // Tạm thời chuyển hướng về trang chủ (sau này là trang 404 của React)
            return ResponseEntity
                    .status(HttpStatus.FOUND)
                    .location(URI.create("http://localhost:5173/not-found")) // Link trang React
                    .build();
        }
    }
}