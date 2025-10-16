import Home from './pages/Home';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import VideoReview from './pages/VideoReview';
import Contact from './pages/Contact';
import RentalListPage from './pages/RentalListPage';
import HostInfo from './pages/HostInfo';
import LandlordDashboard from './pages/LandlordDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// [MỚI] Import component trang chi tiết tin đăng
import ListingDetailPage from './pages/ListingDetailPage';

const App = () => {
    return (
        <div>
            <Header />
            
            <main>
                <Routes>
                    {/* Route cho trang chủ */}
                    <Route path="/" element={<Home />} />
                    
                    {/* [CẬP NHẬT] Thêm Route động cho trang chi tiết tin đăng. */}
                    {/* Route này phải được đặt TRƯỚC route category để không bị xung đột. */}
                    <Route path="/listing/:id" element={<ListingDetailPage />} />
                    
                    {/* Route động cho các trang danh mục (ví dụ: /nha-nguyen-can, /can-ho) */}
                    <Route path="/:categorySlug" element={<RentalListPage />} />
                    
                    {/* Các route tĩnh khác */}
                    <Route path="/videos" element={<VideoReview />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* Các route được bảo vệ */}
                    <Route path="/host-info" element={<ProtectedRoute><HostInfo /></ProtectedRoute>} />
                    <Route path="/landlord-dashboard" element={<ProtectedRoute><LandlordDashboard /></ProtectedRoute>} />

                    {/* Route cho trang lỗi 404 */}
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </main>
            
            <Footer />
            <BackToTop />
        </div>
    );
};

export default App;