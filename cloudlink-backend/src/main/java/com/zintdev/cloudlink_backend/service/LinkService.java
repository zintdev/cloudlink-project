package com.zintdev.cloudlink_backend.service;

import java.util.Random;

import org.springframework.stereotype.Service;

import com.zintdev.cloudlink_backend.domain.entity.ShortLink;
import com.zintdev.cloudlink_backend.dto.CreateLinkRequest;
import com.zintdev.cloudlink_backend.dto.ShortLinkResponse;
import com.zintdev.cloudlink_backend.repository.ShortLinkRepository;

import lombok.RequiredArgsConstructor;

@Service // Báo cho Spring biết đây là một lớp Logic
@RequiredArgsConstructor // Lombok: Tự động @Autowired cho các trường 'final'
public class LinkService {

    // Dependency Injection (DI)
    private final ShortLinkRepository shortLinkRepository;

    // Bạn có thể chuyển cái này ra file application.properties sau
    private final String BASE_URL = "http://zint.com/"; 
    
    private static final int SHORT_CODE_LENGTH = 6;
    private static final String ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private Random random = new Random();

    public ShortLinkResponse createShortLink(CreateLinkRequest request) {
        
        String shortCode;
        
        // **Nghiệp vụ quan trọng: Đảm bảo link là duy nhất**
        // Lặp lại việc tạo mã cho đến khi tìm được mã chưa ai dùng
        do {
            shortCode = generateRandomShortCode();
        } while (shortLinkRepository.existsByShortCode(shortCode)); // Dùng hàm ta đã tạo

        // **Nghiệp vụ 1: Lưu vào DB**
        ShortLink newLink = new ShortLink();
        newLink.setOriginalUrl(request.getOriginalUrl());
        newLink.setShortCode(shortCode);
        
        // Lưu Entity vào CSDL
        shortLinkRepository.save(newLink);

        // Trả về DTO cho người dùng
        return new ShortLinkResponse(BASE_URL + shortCode, request.getOriginalUrl());
    }

    // Hàm private để tạo mã ngẫu nhiên
    private String generateRandomShortCode() {
        StringBuilder sb = new StringBuilder(SHORT_CODE_LENGTH);
        for (int i = 0; i < SHORT_CODE_LENGTH; i++) {
            sb.append(ALPHANUMERIC.charAt(random.nextInt(ALPHANUMERIC.length())));
        }
        return sb.toString();
    }
}