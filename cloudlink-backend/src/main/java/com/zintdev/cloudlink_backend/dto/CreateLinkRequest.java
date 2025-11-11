package com.zintdev.cloudlink_backend.dto;

import jakarta.validation.constraints.NotEmpty; 
import org.hibernate.validator.constraints.URL; 
import lombok.Data;

@Data // Lombok: Tự tạo Getters, Setters, toString...
public class CreateLinkRequest {

    @NotEmpty(message = "URL không được để trống")
    @URL(message = "Định dạng URL không hợp lệ") // Tự động kiểm tra đây phải là 1 URL
    private String originalUrl;

    // (Tương lai bạn có thể thêm: private String customAlias;)
}
