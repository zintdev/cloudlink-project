package com.zintdev.cloudlink_backend.domain.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "short_links")
@Getter
@Setter
public class ShortLink {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // PostgreSQL tự động tăng ID
    private Long id;

    @Column(nullable = false, unique = true, length = 10) // Mã ngắn là duy nhất và có index
    private String shortCode;

    @Column(nullable = false, length = 2048) // Link gốc, giới hạn 2048 ký tự
    private String originalUrl;

    @Column(nullable = false, updatable = false) // Chỉ set 1 lần khi tạo
    private LocalDateTime createdAt;
    
    // Chúng ta sẽ tự động set giá trị này trước khi lưu
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
