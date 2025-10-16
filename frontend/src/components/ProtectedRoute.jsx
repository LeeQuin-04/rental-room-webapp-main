import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Lấy token để kiểm tra trạng thái đăng nhập
    const token = localStorage.getItem('auth_token');

    // Nếu không có token (chưa đăng nhập), chuyển hướng về trang chủ
    if (!token) {
        // Bạn có thể thêm logic mở form đăng nhập ở đây nếu muốn
        return <Navigate to="/" replace />;
    }

    // Nếu đã đăng nhập, cho phép truy cập
    return children;
};

export default ProtectedRoute;