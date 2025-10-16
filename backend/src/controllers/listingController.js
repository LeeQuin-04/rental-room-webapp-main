const pool = require('../config/db');

// --- HÀM LẤY DANH SÁCH CÁC LOẠI TIN ĐĂNG ---
// Được sử dụng bởi form tạo tin đăng để lấy ID
exports.getAllListingTypes = async (req, res) => {
    try {
        const [types] = await pool.query('SELECT id, name FROM listing_types');
        res.status(200).json(types);
    } catch (error) {
        console.error('[SERVER ERROR] Lỗi khi lấy danh sách loại tin đăng:', error);
        res.status(500).json({ message: 'Lỗi server khi lấy dữ liệu.' });
    }
};

// --- HÀM LẤY THÔNG TIN CHI TIẾT CỦA MỘT DANH MỤC ---
// Cần thiết cho route '/category-details/:categorySlug' để server không bị crash
exports.getCategoryDetailsBySlug = async (req, res) => {
    try {
        const { categorySlug } = req.params;
        const sql = `SELECT id, name, slug FROM listing_types WHERE slug = ?`;
        const [categories] = await pool.execute(sql, [categorySlug]);

        if (categories.length > 0) {
            res.status(200).json(categories[0]);
        } else {
            res.status(404).json({ message: 'Không tìm thấy danh mục.' });
        }
    } catch (error) {
        console.error('[SERVER ERROR] Lỗi khi lấy chi tiết danh mục:', error);
        res.status(500).json({ message: 'Lỗi server.' });
    }
};

// --- HÀM LẤY "TIN HOT" (5 TIN MỚI NHẤT) ---
// Sửa lại để lấy 5 tin mới nhất không phân biệt loại
exports.getHotListings = async (req, res) => {
    try {
        const [listings] = await pool.query(`
            SELECT 
                l.id, l.name, l.price, l.area, l.address, l.street, li.image_url 
            FROM listings l
            LEFT JOIN (
                SELECT listing_id, image_url FROM listing_images WHERE is_main = 1
            ) AS li ON l.id = li.listing_id
            ORDER BY l.created_at DESC
            LIMIT 5
        `);
        res.status(200).json(listings);
    } catch (error) {
        console.error('[SERVER ERROR] Lỗi khi lấy tin mới nhất:', error);
        res.status(500).json({ message: 'Lỗi server.' });
    }
};

// --- HÀM LẤY TIN THEO DANH MỤC (slug) ---
// Tối ưu hóa để truy vấn trực tiếp bằng cột slug trong CSDL
// Thay thế hàm này trong file: backend/src/controllers/listingController.js

exports.getListingsByCategorySlug = async (req, res) => {
    try {
        const { categorySlug } = req.params;
        
        // [SỬA ĐỔI 1] Đảm bảo 'limit' là một số nguyên an toàn
        // Lấy limit từ query, nếu không có thì mặc định là 5
        let limit = req.query.limit ? parseInt(req.query.limit, 10) : 5;
        // Kiểm tra xem có phải là số không, nếu không thì quay về mặc định
        if (isNaN(limit) || limit <= 0) {
            limit = 5;
        }

        // [SỬA ĐỔI 2] Đưa 'limit' trực tiếp vào câu lệnh SQL
        // Lưu ý: Chỉ làm điều này khi bạn đã chắc chắn 'limit' là một con số
        const sql = `
            SELECT 
                l.id, l.name, l.price, l.area, l.address, l.street, li.image_url
            FROM listings l
            JOIN listing_types lt ON l.listing_type_id = lt.id
            LEFT JOIN (
                SELECT listing_id, image_url FROM listing_images WHERE is_main = 1
            ) AS li ON l.id = li.listing_id
            WHERE lt.slug = ? 
            ORDER BY l.created_at DESC
            LIMIT ${limit} 
        `; // Bỏ dấu '?' và đưa biến limit vào

        // [SỬA ĐỔI 3] Bây giờ mảng tham số chỉ còn 1 giá trị
        const [listings] = await pool.execute(sql, [categorySlug]); 
        
        res.status(200).json(listings);

    } catch (error) {
        console.error(`[SERVER ERROR] Lỗi khi lấy tin theo danh mục ${req.params.categorySlug}:`, error);
        res.status(500).json({ message: 'Lỗi server.' });
    }
};
// --- HÀM LẤY CHI TIẾT MỘT TIN ĐĂNG ---
// Đảm bảo trả về cả thông tin tin đăng và danh sách ảnh
exports.getListingById = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ message: 'ID tin đăng không hợp lệ.' });
    }

    try {
        const listingSql = `
            SELECT l.*, u.full_name as host_name, u.avatar as host_avatar, u.phone as host_phone
            FROM listings l 
            JOIN users u ON l.user_id = u.id
            WHERE l.id = ?;
        `;
        const [listings] = await pool.execute(listingSql, [id]);

        if (listings.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy tin đăng.' });
        }
        
        const listingDetails = listings[0];
        
        const imagesSql = `SELECT id, image_url FROM listing_images WHERE listing_id = ? ORDER BY is_main DESC, id ASC;`;
        const [images] = await pool.execute(imagesSql, [id]);
        
        res.status(200).json({ 
            ...listingDetails, 
            images: images 
        });

    } catch (error) {
        console.error(`[SERVER ERROR] Lỗi khi lấy chi tiết tin đăng ID ${id}:`, error);
        res.status(500).json({ message: 'Lỗi server khi lấy dữ liệu.' });
    }
};

// --- HÀM TẠO MỘT TIN ĐĂNG MỚI ---
// Đã được tối ưu để xử lý multipart/form-data và parse dữ liệu an toàn
exports.createListing = async (req, res) => {
    const userId = req.userId;
    let {
        listing_type_id, name, room_count, area, location_id,
        street, address, price, amenities, surroundings, description, rules
    } = req.body;
    const files = req.files;

    const finalListingTypeId = listing_type_id ? parseInt(listing_type_id, 10) : null;
    const finalLocationId = location_id ? parseInt(location_id, 10) : null;
    const finalRoomCount = room_count ? parseInt(room_count, 10) : 1;
    const finalArea = area ? parseFloat(area) : null;
    const finalPrice = price ? parseFloat(price) : null;

    if (!name || !finalListingTypeId || !finalPrice || !finalArea || !address) {
        return res.status(400).json({ message: 'Vui lòng điền đầy đủ các thông tin bắt buộc (Tên, Loại tin, Giá, Diện tích, Địa chỉ).' });
    }

    let finalAmenities = [], finalSurroundings = [], finalRules = [];
    try {
        if (amenities) finalAmenities = JSON.parse(amenities);
        if (surroundings) finalSurroundings = JSON.parse(surroundings);
        if (rules) finalRules = JSON.parse(rules);
    } catch (parseError) {
        return res.status(400).json({ message: 'Dữ liệu tiện nghi, môi trường hoặc nội quy không hợp lệ.' });
    }
    
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const listingSql = `
            INSERT INTO listings (
                user_id, listing_type_id, name, room_count, area, location_id, 
                street, address, price, amenities, surroundings, description, rules
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            userId, finalListingTypeId, name, finalRoomCount, finalArea,
            finalLocationId, street || null, address, finalPrice,
            JSON.stringify(finalAmenities), JSON.stringify(finalSurroundings),
            description || null, JSON.stringify(finalRules),
        ];

        const [result] = await connection.execute(listingSql, values);
        const newListingId = result.insertId;

        if (files && files.length > 0) {
            const imagesSql = `INSERT INTO listing_images (listing_id, image_url, is_main) VALUES ?`;
            const imagesValues = files.map((file, index) => {
                const PORT = process.env.PORT || 3001;
                const imageUrl = `http://localhost:${PORT}/public/uploads/${file.filename}`;
                return [newListingId, imageUrl, index === 0 ? 1 : 0];
            });
            await connection.query(imagesSql, [imagesValues]);
        }

        await connection.commit();
        res.status(201).json({ 
            message: 'Tạo tin đăng thành công!', 
            listingId: newListingId 
        });

    } catch (error) {
        if (connection) await connection.rollback();
        console.error('LỖI KHI TẠO TIN ĐĂNG (BACKEND):', error);
        res.status(500).json({ message: 'Lỗi server khi tạo tin đăng.' });
    } finally {
        if (connection) connection.release();
    }
};