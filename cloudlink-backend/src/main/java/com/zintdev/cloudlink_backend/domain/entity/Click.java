package com.zintdev.cloudlink_backend.domain.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "clicks")
@Getter
@Setter
public class Click {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime clickedAt;

    @Column(length = 50)
    private String ipAddress;

    @Column(length = 255)
    private String userAgent;

    // Thiết lập mối quan hệ: Nhiều "Clicks" thuộc về một "ShortLink"
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "short_link_id", nullable = false)
    private ShortLink shortLink;

    @PrePersist
    protected void onCreate() {
        clickedAt = LocalDateTime.now();
    }
}
