CREATE DATABASE html_content_db;

USE html_content_db;

CREATE TABLE html_content (
    id VARCHAR(36) PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
