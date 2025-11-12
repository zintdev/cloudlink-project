package com.zintdev.cloudlink_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Chỉ áp dụng cho các API dưới /api/
            .allowedOrigins(
                "http://localhost:5173",  // Cho phép React dev server
                "http://127.0.0.1:5173" // (Một số trình duyệt dùng 127.0.0.1)
            ) 
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Các phương thức cho phép
            .allowedHeaders("*") // Cho phép tất cả các header
            .allowCredentials(false); // Không cần cookie hay auth token vội
        
        // Bạn cũng cần cho phép CORS cho Redirect Controller (vì nó nằm ở gốc "/")
        registry.addMapping("/*") // Áp dụng cho "/*" (ví dụ /AbC12)
            .allowedOrigins("*") // Cho phép TẤT CẢ các nguồn gốc (cho redirect)
            .allowedMethods("GET"); 
    }
}