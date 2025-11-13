package com.zintdev.cloudlink_backend.repository;

import com.zintdev.cloudlink_backend.domain.entity.ShortLink;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// JpaRepository<Tên_Entity, Kiểu_Dữ_Liệu_Của_Khóa_Chính>
public interface ShortLinkRepository extends JpaRepository<ShortLink, Long> {

    /* * Spring Data JPA sẽ tự động hiểu phương thức này:
     * "Hãy tìm trong bảng ShortLink bằng cột 'shortCode'"
     * Chúng ta sẽ dùng nó ở feature "Redirect"
     */
    Optional<ShortLink> findByShortCode(String shortCode);

    /*
     * "Kiểm tra xem một 'shortCode' đã tồn tại hay chưa"
     * Đây là nghiệp vụ quan trọng để tránh tạo trùng link ngắn.
     */
    boolean existsByShortCode(String shortCode);
}