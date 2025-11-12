-- Create databases for each domain
CREATE DATABASE IF NOT EXISTS bookstore CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS user_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS post_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS chat_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS wish_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS book_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS alert_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create users for each domain
CREATE USER IF NOT EXISTS 'user_user'@'%' IDENTIFIED BY 'user_pw';
CREATE USER IF NOT EXISTS 'post_user'@'%' IDENTIFIED BY 'post_pw';
CREATE USER IF NOT EXISTS 'chat_user'@'%' IDENTIFIED BY 'chat_pw';
CREATE USER IF NOT EXISTS 'wish_user'@'%' IDENTIFIED BY 'wish_pw';
CREATE USER IF NOT EXISTS 'book_user'@'%' IDENTIFIED BY 'book_pw';
CREATE USER IF NOT EXISTS 'alert_user'@'%' IDENTIFIED BY 'alert_pw';

-- Grant privileges
GRANT ALL PRIVILEGES ON bookstore.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON user_db.* TO 'user_user'@'%';
GRANT ALL PRIVILEGES ON post_db.* TO 'post_user'@'%';
GRANT ALL PRIVILEGES ON chat_db.* TO 'chat_user'@'%';
GRANT ALL PRIVILEGES ON wish_db.* TO 'wish_user'@'%';
GRANT ALL PRIVILEGES ON book_db.* TO 'book_user'@'%';
GRANT ALL PRIVILEGES ON alert_db.* TO 'alert_user'@'%';
FLUSH PRIVILEGES;
