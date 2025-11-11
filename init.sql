-- Create database
CREATE DATABASE IF NOT EXISTS bookstore CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE bookstore;

-- User tables would be created by JPA/Hibernate
-- Post tables would be created by JPA/Hibernate
-- Chat tables would be created by JPA/Hibernate
-- Wish tables would be created by JPA/Hibernate
-- Trade tables would be created by JPA/Hibernate

-- Grant privileges
GRANT ALL PRIVILEGES ON bookstore.* TO 'root'@'%';
FLUSH PRIVILEGES;
