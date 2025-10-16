// backend/src/controllers/authController.js

const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// [CẬP NHẬT] Hàm Đăng ký
exports.register = async (req, res) => {
    const { full_name, email, phone, password } = req.body;

    // [SỬA LỖI] Cập nhật logic kiểm tra đầu vào
    if (!full_name || !password) {
        return res.status(400).json({ message: 'Vui lòng điền họ tên và mật khẩu.' });
    }
    // Đảm bảo có ít nhất email hoặc số điện thoại
    if (!email && !phone) {
        return res.status(400).json({ message: 'Vui lòng điền email hoặc số điện thoại.' });
    }

    try {
        // [SỬA LỖI] Cập nhật truy vấn để xử lý trường hợp phone hoặc email có thể rỗng
        // Chúng ta chỉ kiểm tra trùng lặp nếu giá trị được cung cấp
        let checkUserSql = 'SELECT * FROM users WHERE 1=0'; // Truy vấn không trả về gì theo mặc định
        const params = [];
        if (email) {
            checkUserSql += ' OR email = ?';
            params.push(email);
        }
        if (phone) {
            checkUserSql += ' OR phone = ?';
            params.push(phone);
        }

        const [existingUsers] = await pool.execute(checkUserSql, params);

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Email hoặc số điện thoại đã được sử dụng.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Truyền giá trị null cho email hoặc phone nếu chúng rỗng
        const insertUserSql = 'INSERT INTO users (full_name, email, phone, password) VALUES (?, ?, ?, ?)';
        await pool.execute(insertUserSql, [full_name, email || null, phone || null, hashedPassword]);

        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error('LỖI KHI ĐĂNG KÝ (BACKEND):', error);
        res.status(500).json({ message: 'Lỗi server khi đăng ký.' });
    }
};

exports.login = async (req, res) => {
    // Nhận 'emailOrPhone' từ frontend
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
        return res.status(400).json({ message: 'Vui lòng điền email/số điện thoại và mật khẩu.' });
    }

    try {
        // Tìm người dùng bằng cả email VÀ số điện thoại
        const findUserSql = 'SELECT * FROM users WHERE email = ? OR phone = ?';
        const [users] = await pool.execute(findUserSql, [emailOrPhone, emailOrPhone]);

        if (users.length === 0) {
            return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không chính xác.' });
        }

        const user = users[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Tài khoản hoặc mật khẩu không chính xác.' });
        }

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        delete user.password;

        res.status(200).json({
            message: 'Đăng nhập thành công!',
            token,
            user
        });

    } catch (error) {
        console.error('LỖI KHI ĐĂNG NHẬP (BACKEND):', error);
        res.status(500).json({ message: 'Lỗi server khi đăng nhập.' });
    }
};