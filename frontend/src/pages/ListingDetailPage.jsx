import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
    Wifi, Tv, Wind, Refrigerator, CookingPot, Bath, Shirt, Camera, Waves, ParkingCircle,
    Bed, ArrowUpDown, View, Dumbbell, Store, ShoppingCart, Hospital, School, Bus, Trees,
    ShieldAlert, CheckCircle2, Loader2
} from 'lucide-react';

// ==================== ICON MAP (Không thay đổi) ====================
const iconMap = {
    'Gác lửng': <Bed size={16} className="text-gray-600" />, 'Wifi': <Wifi size={16} className="text-gray-600" />,
    'Vệ sinh trong': <Bath size={16} className="text-gray-600" />, 'Phòng tắm': <Bath size={16} className="text-gray-600" />,
    'Bình nóng lạnh': <Bath size={16} className="text-gray-600" />, 'Kệ bếp': <CookingPot size={16} className="text-gray-600" />,
    'Máy giặt': <Shirt size={16} className="text-gray-600" />, 'Tivi': <Tv size={16} className="text-gray-600" />,
    'Điều hòa': <Wind size={16} className="text-gray-600" />, 'Tủ lạnh': <Refrigerator size={16} className="text-gray-600" />,
    'Giường nệm': <Bed size={16} className="text-gray-600" />, 'Tủ áo quần': <Shirt size={16} className="text-gray-600" />,
    'Ban công/ sân thượng': <View size={16} className="text-gray-600" />, 'Thang máy': <ArrowUpDown size={16} className="text-gray-600" />,
    'Bãi để xe riêng': <ParkingCircle size={16} className="text-gray-600" />, 'Camera an ninh': <Camera size={16} className="text-gray-600" />,
    'Hồ bơi': <Waves size={16} className="text-gray-600" />, 'Sân vườn': <Trees size={16} className="text-gray-600" />,
    'Chợ': <Store size={16} className="text-gray-600" />, 'Siêu thị': <ShoppingCart size={16} className="text-gray-600" />,
    'Bệnh viện': <Hospital size={16} className="text-gray-600" />, 'Trường học': <School size={16} className="text-gray-600" />,
    'Công viên': <Trees size={16} className="text-gray-600" />, 'Bến xe bus': <Bus size={16} className="text-gray-600" />,
    'Trung tâm thể dục thể thao': <Dumbbell size={16} className="text-gray-600" />,
};

const AmenityIcon = ({ name }) => iconMap[name] || <CheckCircle2 size={16} className="text-gray-600" />;

// ==================== MAIN COMPONENT ====================
const ListingDetailPage = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListingDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/api/listings/listing/${id}`);
                setListing(response.data);
            } catch (err) {
                setError("Không tìm thấy tin đăng hoặc đã có lỗi xảy ra.");
            } finally {
                setLoading(false);
            }
        };
        fetchListingDetails();
    }, [id]);

    useEffect(() => {
        document.title = listing ? `${listing.name} | Phongtro247` : 'Chi tiết tin đăng';
    }, [listing]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center mt-[72px] text-gray-600">
                <Loader2 className="animate-spin mr-2" /> Đang tải dữ liệu...
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center mt-[72px] text-red-500">
                {error}
            </div>
        );
    }

    if (!listing) return null;

    // --- Biến và hàm hỗ trợ ---
    const formatPrice = (price) => {
        if (!price || isNaN(price)) return 'Thỏa thuận';
        if (price >= 1000000) return `${(price / 1000000).toFixed(1).replace('.0', '')} triệu`;
        return `${(price / 1000).toLocaleString('vi-VN')} ngàn`;
    };

    const formattedPrice = formatPrice(listing.price);
    const amenities = Array.isArray(listing.amenities) ? listing.amenities : [];
    const surroundings = Array.isArray(listing.surroundings) ? listing.surroundings : [];
    const rules = Array.isArray(listing.rules) ? listing.rules : [];
    const images = Array.isArray(listing.images) ? listing.images : [];
    const placeholderImg = 'https://placehold.co/800x600?text=TroMoi';
    const hostAvatar = listing.host_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(listing.host_name || 'Host')}&background=random&color=fff&bold=true`;
    
    return (
        <div className="2xl:px-48 xl:px-32 md:px-10 px-4 mt-[100px] mb-10">
            {/* --------- TITLE --------- */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{listing.name}</h1>
            <p className="text-gray-600 mb-4">{listing.address}</p>

            {/* --------- IMAGE GALLERY (Đã sửa lỗi giao diện) --------- */}
            {images.length > 0 && (
                <div className="grid md:grid-cols-2 gap-2 mb-8">
                    {/* Ảnh chính */}
                    <div>
                        <img
                            src={images[0].image_url}
                            alt="Main"
                            className="w-full h-auto object-cover rounded-lg cursor-pointer hover:opacity-95 transition"
                        />
                    </div>
                    {/* 4 ảnh phụ */}
                    <div className="hidden md:grid grid-cols-2 gap-2">
                        {[...Array(4)].map((_, index) => (
                            <div key={index}>
                                <img
                                    src={images[index + 1]?.image_url || placeholderImg}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg cursor-pointer hover:opacity-95 transition"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* --------- DETAILS + CONTACT --------- */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT CONTENT */}
                <div className="flex-[2]">
                    <div className="border-b pb-4 mb-4">
                        <h2 className="text-xl font-semibold mb-2">Thông tin chi tiết</h2>
                        <div className="flex items-center text-2xl font-bold text-red-500 mb-4">
                            {formattedPrice} / tháng
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
                            <span>Diện tích: <strong>{listing.area} m²</strong></span>
                            <span>Số phòng: <strong>{listing.room_count}</strong></span>
                        </div>
                    </div>

                    {listing.description && (
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
                            <p className="text-gray-700 whitespace-pre-wrap">{listing.description}</p>
                        </div>
                    )}

                    {amenities.length > 0 && (
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Tiện nghi</h2>
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
                                {amenities.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <AmenityIcon name={item} /><span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {surroundings.length > 0 && (
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Môi trường xung quanh</h2>
                            <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-3">
                                {surroundings.map((item, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <AmenityIcon name={item} /><span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {rules.length > 0 && (
                        <div className="border-b pb-4 mb-4">
                            <h2 className="text-xl font-semibold mb-2">Nội quy</h2>
                            <ul className="list-none space-y-2">
                                {rules.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <ShieldAlert size={18} className="text-gray-600 mt-1 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* [ĐÃ XÓA] Phần Google Map đã được loại bỏ */}
                </div>

                {/* RIGHT CONTENT - CONTACT */}
                <div className="flex-1">
                    <div className="border p-4 rounded-lg shadow-md sticky top-28">
                        <h3 className="text-lg font-bold mb-4">Thông tin liên hệ</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={hostAvatar}
                                alt="Host Avatar"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-lg">{listing.host_name || 'Chủ trọ'}</p>
                            </div>
                        </div>
                        {listing.host_phone && (
                            <a
                                href={`tel:${listing.host_phone}`}
                                className="w-full block text-center bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Gọi: {listing.host_phone}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetailPage;