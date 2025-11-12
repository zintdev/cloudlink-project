package com.zintdev.cloudlink_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zintdev.cloudlink_backend.domain.entity.Click;

public interface ClickRepository extends JpaRepository<Click, Long> {
}