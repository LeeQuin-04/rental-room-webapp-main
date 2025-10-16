// backend/src/routes/listingRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const listingController = require('../controllers/listingController');
const { verifyToken } = require('../middleware/authMiddleware');

// [MỚI] Cấu hình Multer để lưu trữ file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Đường dẫn tương đối từ gốc project backend
        cb(null, 'public/uploads/'); 
    },
    filename: function (req, file, cb) {
        // Tạo tên file duy nhất để tránh bị ghi đè
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    // Bạn có thể thêm giới hạn file ở đây
    limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB mỗi file
    fileFilter: (req, file, cb) => {
        // Chỉ chấp nhận các file ảnh
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Chỉ cho phép tải lên file hình ảnh!'), false);
        }
    }
});

// [CẬP NHẬT] Thêm middleware 'upload.array()' vào route '/create'
// 'images' là tên trường file gửi từ frontend, 10 là số lượng file tối đa
router.post('/create', verifyToken, upload.array('images', 10), listingController.createListing);

// --- Các routes GET khác giữ nguyên ---
router.get('/types', listingController.getAllListingTypes);
router.get('/hot', listingController.getHotListings);
router.get('/category-details/:categorySlug', listingController.getCategoryDetailsBySlug);
router.get('/category/:categorySlug', listingController.getListingsByCategorySlug);
router.get('/listing/:id', listingController.getListingById);

module.exports = router;