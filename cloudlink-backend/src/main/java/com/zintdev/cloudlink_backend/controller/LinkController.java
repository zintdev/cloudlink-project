package com.zintdev.cloudlink_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zintdev.cloudlink_backend.dto.CreateLinkRequest;
import com.zintdev.cloudlink_backend.dto.ShortLinkResponse;
import com.zintdev.cloudlink_backend.service.LinkService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/links") 
@RequiredArgsConstructor
public class LinkController {

    private final LinkService linkService;

    // Endpoint: POST /api/v1/links
    @PostMapping
    public ResponseEntity<ShortLinkResponse> createShortLink(
            @Valid @RequestBody CreateLinkRequest request
    ) {
        // @Valid: Kích hoạt validation (@URL, @NotEmpty) trên DTO
        // @RequestBody: Lấy JSON từ body của request
        
        ShortLinkResponse response = linkService.createShortLink(request);
        return ResponseEntity.ok(response);
    }
}