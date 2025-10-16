// backend/src/config/db.js

const mysql = require('mysql2/promise');
require('dotenv').config();

// [CẬP NHẬT] Tạo và export một POOL thay vì một kết nối đơn lẻ
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'tromoi',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kiểm tra kết nối ban đầu
pool.getConnection()
    .then(connection => {
        console.log('Kết nối CSDL thành công!');
        connection.release();
    })
    .catch(err => {
        console.error('Không thể kết nối đến CSDL:', err);
    });

module.exports = pool;