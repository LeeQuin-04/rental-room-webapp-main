const pool = require('../config/db');

exports.updateHostInfo = async (req, res) => {
    // Giá trị này được gán từ middleware sau khi giải mã token
    const userId = req.userId;
    const { full_name, phone, address } = req.body;

    // KIỂM TRA THÊM: Đảm bảo userId tồn tại.
    // Nếu không có userId, nghĩa là có lỗi ở middleware hoặc token.
    if (!userId) {
        console.error('Lỗi nghiêm trọng: Không tìm thấy userId trong request sau khi qua middleware xác thực.');
        return res.status(401).json({ message: 'Không thể xác thực người dùng.' });
    }

    if (!full_name || !phone) {
        return res.status(400).json({ message: 'Họ tên và số điện thoại là bắt buộc.' });
    }

    try {
        await pool.execute(
            "UPDATE users SET full_name = ?, phone = ?, address = ?, has_completed_host_info = 1 WHERE id = ?",
            // Giờ chúng ta đã chắc chắn userId không phải là undefined ở đây
            [full_name, phone, address || null, userId]
        );

        const [users] = await pool.execute(
            "SELECT id, full_name, email, phone, role, has_completed_host_info FROM users WHERE id = ?", 
            [userId]
        );

        return res.status(200).json({ 
            message: 'Cập nhật thông tin thành công!',
            user: users[0] 
        });
    } catch (error) {
        // Log lỗi cụ thể hơn để dễ debug
        console.error(`Lỗi khi cập nhật thông tin cho userId ${userId}:`, error);
        return res.status(500).json({ message: 'Lỗi server!', error: error.message });
    }
};