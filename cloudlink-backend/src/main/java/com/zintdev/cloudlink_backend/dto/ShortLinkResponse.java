package com.zintdev.cloudlink_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor // Lombok: Tự tạo constructor với tất cả các tham số
public class ShortLinkResponse {
    
    // (ví dụ: "http://zint.com/AbC12")
    private String shortLink; 
    
    private String originalUrl;
}