import React, { useState } from 'react';
import { logo } from '../assets/assets';
import CreateListingForm from './CreateListingForm';

const rentalTypes = [
    {
        title: 'Nhà trọ, phòng trọ',
        desc: 'Loại hình phổ biến, dễ cho thuê, phù hợp sinh viên và người đi làm.',
        icon: '🏠',
    },
    {
        title: 'Ký túc xá',
        desc: 'Giải pháp tiết kiệm, phù hợp cho sinh viên hoặc người đi làm ở ghép.',
        icon: '🛏️',
    },
    {
        title: 'Nhà nguyên căn',
        desc: 'Phù hợp cho gia đình hoặc nhóm thuê dài hạn, diện tích rộng rãi.',
        icon: '🏡',
    },
    {
        title: 'Căn hộ',
        desc: 'Tiện nghi, hiện đại, an ninh tốt, phù hợp gia đình nhỏ hoặc người thuê lâu dài.',
        icon: '🏢',
    },
];

const LandlordDashboard = () => {
    const [selectedType, setSelectedType] = useState(null);

    return (
        <div className="min-h-screen bg-[#f5f7fa] flex flex-col pt-[80px]">
            {/* Nội dung chính */}
            <div className="flex flex-1 w-full 2xl:px-40 xl:px-24 lg:px-16 md:px-8 px-4 py-8 gap-8">
                {/* Sidebar */}
                <aside className="w-64 bg-white rounded-2xl shadow-md flex flex-col p-6">
                    <div className="text-lg font-bold text-[#1976d2] mb-6 text-center">
                        Quản lý cho thuê
                    </div>
                    <nav className="flex flex-col gap-y-3 text-gray-700">
                        <span className="font-medium text-[#1976d2]">Khách thuê</span>
                        <span>Hợp đồng</span>
                        <span>Hóa đơn</span>
                        <span>Thu chi</span>
                        <span>Dịch vụ</span>
                        <span>Báo cáo</span>
                        <span>Phản ánh, sự cố</span>
                        <span>Khách hàng đánh giá</span>
                    </nav>

                    <div className="mt-8 border-t pt-4">
                        <div className="font-medium text-gray-700 mb-2">Thanh toán</div>
                        <div className="font-medium text-gray-700 mb-2">Hệ thống</div>
                    </div>

                    {/* Hỗ trợ */}
                    <div className="mt-auto border-t pt-6">
                        <div className="text-sm text-gray-600 mb-2">Nhân viên hỗ trợ</div>
                        <div className="flex items-center gap-x-3 mb-3">
                            <img
                                src="../src/assets/Nguyen.jpg"
                                alt="Khuất Văn Nguyên"
                                className="w-10 h-10 rounded-full object-cover border border-gray-300"
                            />
                            <div>
                                <div className="font-medium text-gray-800">Khuất Văn Nguyên</div>
                                <div className="text-xs text-blue-600">0818 876 833</div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-600">
                            Hotline:{' '}
                            <span className="font-semibold text-blue-600">033.266.1579</span>
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                            © 2015 - 2025 OHI Co.Ltd
                        </div>
                    </div>
                </aside>

                {/* Nội dung chính */}
                <section className="flex-1 bg-white rounded-2xl shadow-md p-6 overflow-y-auto">
    {!selectedType ? (
        <>
            <div className="flex items-center justify-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                    CHỌN LOẠI HÌNH CHO THUÊ
                </h2>
                            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center">
                {rentalTypes.map((type, idx) => (
                    <div
                        key={idx}
                        className="w-full max-w-sm border rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-white"
                    >
                        <div className="text-5xl mb-3">{type.icon}</div>
                        <div className="font-semibold text-[#1976d2] text-center mb-2">
                            {type.title}
                        </div>
                        <div className="text-sm text-gray-600 mb-4 text-center leading-relaxed">
                            {type.desc}
                        </div>
                        <button
                            className="bg-[#1976d2] text-white px-5 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                            onClick={() => setSelectedType(type.title)}
                        >
                            Đăng ngay
                        </button>
                    </div>
                ))}
            </div>
        </>
    ) : (
        <CreateListingForm
            type={selectedType}
            onBack={() => setSelectedType(null)}
        />
    )}
</section>


            </div>
        </div>
    );
};

export default LandlordDashboard;
