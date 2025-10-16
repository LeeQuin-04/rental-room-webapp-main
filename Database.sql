-- CREATE DATABASE IF NOT EXISTS tromoi;
USE tromoi;

-- Tắt kiểm tra khóa ngoại để xóa bảng an toàn
SET FOREIGN_KEY_CHECKS = 0;

-- =================================================================
-- LỆNH XÓA CÁC BẢNG CŨ (NẾU TỒN TẠI)
-- =================================================================

DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS blog_comments;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS listing_view_stats;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS listing_reports;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS inquiries;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS listing_amenities;
DROP TABLE IF EXISTS listing_images;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS incidents;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS invoice_details;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS room_services;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS contracts;
DROP TABLE IF EXISTS rooms;
DROP TABLE IF EXISTS buildings;
DROP TABLE IF EXISTS amenities;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS listing_types;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS notifications;

-- Bật lại kiểm tra khóa ngoại
SET FOREIGN_KEY_CHECKS = 1;


-- =================================================================
-- BẢNG CƠ BẢN (KHÔNG THAY ĐỔI NHIỀU)
-- =================================================================

-- 1. Bảng Người dùng
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user',
    avatar VARCHAR(255),
    address VARCHAR(255) NULL,
    has_completed_host_info TINYINT DEFAULT 0,
    verified TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Loại tin đăng
CREATE TABLE listing_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
);

-- 3. Bảng Khu vực
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    parent_id INT,
    type VARCHAR(50)
);

-- =================================================================
-- BẢNG CHÍNH ĐÃ ĐƯỢC ĐƠN GIẢN HÓA
-- =================================================================

-- 4. Bảng Tin đăng (ĐÃ MỞ RỘNG)
CREATE TABLE listings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,

    -- Thông tin cơ bản từ Form
    listing_type_id INT,
    name VARCHAR(255) NOT NULL,
    room_count INT DEFAULT 1,
    area FLOAT,
    location_id INT,
    street VARCHAR(255),
    address VARCHAR(255),
    price DECIMAL(12, 2),

    -- Thông tin chi tiết (lưu dưới dạng JSON hoặc TEXT)
    amenities JSON,
    surroundings JSON,
    description TEXT,
    rules TEXT,

    -- Thông tin hệ thống
    status VARCHAR(20) DEFAULT 'published',
    views INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (listing_type_id) REFERENCES listing_types(id),
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- 5. Bảng Ảnh tin đăng
CREATE TABLE listing_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT,
    image_url VARCHAR(255),
    is_main TINYINT DEFAULT 0,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- =================================================================
-- CÁC BẢNG PHỤ TRỢ (GIỮ NGUYÊN)
-- =================================================================

-- 6. Bảng Yêu thích
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    listing_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- 7. Bảng Liên hệ / Tin nhắn
CREATE TABLE inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT,
    user_id INT,
    sender_name VARCHAR(100),
    sender_phone VARCHAR(20),
    message TEXT,
    is_read TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 8. Bảng Đánh giá / Bình luận
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT,
    user_id INT,
    rating INT,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 9. Bảng Báo cáo tin đăng
CREATE TABLE listing_reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT,
    reporter_id INT,
    reason TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id),
    FOREIGN KEY (reporter_id) REFERENCES users(id)
);

-- 10. Bảng Bài viết blog
CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT,
    title VARCHAR(255),
    content TEXT,
    cover_image VARCHAR(255),
    status VARCHAR(20) DEFAULT 'published',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- 11. Bảng Bình luận blog
CREATE TABLE blog_comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    user_id INT,
    name VARCHAR(100),
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 12. Bảng Thống kê lượt xem
CREATE TABLE listing_view_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    listing_id INT,
    view_date DATE,
    views INT DEFAULT 0,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- 13. Bảng Thông báo người dùng
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(255),
    message TEXT,
    is_read TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 14. Bảng Nhật ký hoạt động (cho Admin)
CREATE TABLE audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    actor_id INT,
    action VARCHAR(100),
    object_type VARCHAR(100),
    object_id VARCHAR(50),
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actor_id) REFERENCES users(id)
);
INSERT INTO listing_types (name) VALUES
('Nhà trọ, phòng trọ'),
('Ký túc xá'),
('Nhà nguyên căn'),
('Căn hộ');
ALTER TABLE listing_types
ADD COLUMN slug VARCHAR(255) NOT NULL AFTER name;
UPDATE listing_types SET slug = 'nha-tro-phong-tro' WHERE id = 1;
UPDATE listing_types SET slug = 'ky-tuc-xa' WHERE id = 2;
UPDATE listing_types SET slug = 'nha-nguyen-can' WHERE id = 3;
UPDATE listing_types SET slug = 'can-ho' WHERE id = 4;
select * from users;