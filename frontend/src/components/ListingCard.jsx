// frontend/src/components/ListingCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const ListingCard = ({ listing }) => {

    // --- [SỬA LỖI QUAN TRỌNG] Xử lý giá tiền một cách an toàn ---
    const formatPrice = (price) => {
        if (!price || isNaN(price)) {
            return 'Thỏa thuận'; // Trả về "Thỏa thuận" nếu giá không hợp lệ
        }
        if (price >= 1000000) {
            // Nếu giá từ 1 triệu trở lên, hiển thị dạng "X triệu/tháng"
            return `${(price / 1000000).toFixed(1).replace('.0', '')} triệu/tháng`;
        }
        if (price >= 1000) {
             // Nếu giá từ 1 ngàn đến dưới 1 triệu, hiển thị dạng "XXX ngàn/tháng"
            return `${(price / 1000).toLocaleString('vi-VN')} ngàn/tháng`;
        }
        return `${price.toLocaleString('vi-VN')} đ/tháng`;
    };

    const formattedPrice = formatPrice(listing.price);
    const placeholderImg = 'https://placehold.co/400x300?text=TroMoi';
    const imageUrl = listing.image_url || placeholderImg;
    const fullAddress = [listing.address, listing.street].filter(Boolean).join(', ');

    return (
        <Link to={`/listing/${listing.id}`} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <div className="relative aspect-[4/3]">
                <img 
                    src={imageUrl} 
                    alt={listing.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-2 left-2 text-white font-bold text-lg">
                    {formattedPrice}
                </div>
            </div>
            <div className="p-3">
                <h4 className="font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors" title={listing.name}>
                    {listing.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                    {listing.area} m²
                </p>
                <div className="flex items-start gap-1 mt-2 text-sm text-gray-600">
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                    <p className="truncate" title={fullAddress}>
                        {fullAddress}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ListingCard;