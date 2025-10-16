const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// [SỬA LỖI] Đường dẫn đúng khi file app.js nằm trong thư mục 'src'
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const userRoutes = require('./routes/userRoutes');
const pool = require('./config/db'); // Import pool để đảm bảo kết nối hoạt động

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// [SỬA LỖI] Đường dẫn đúng để phục vụ file tĩnh từ thư mục 'public'
// Vì app.js ở trong 'src', chúng ta cần đi ra một cấp ('../') để vào 'public'
app.use('/public', express.static(path.join(__dirname, '../public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
    // Kiểm tra kết nối CSDL khi server khởi động
    pool.getConnection()
        .then(connection => {
            console.log('Kết nối CSDL thành công!');
            connection.release();
        })
        .catch(err => {
            console.error('Không thể kết nối đến CSDL khi khởi động server:', err);
        });
});