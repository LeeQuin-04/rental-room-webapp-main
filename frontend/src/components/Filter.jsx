import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Filter = ({ isDesktop, toggleFilter }) => {
    const [showArea, setShowArea] = useState(true);
    const [showAmenities, setShowAmenities] = useState(true);
    const [showEnvironment, setShowEnvironment] = useState(true);
    const [showTarget, setShowTarget] = useState(true);
    const [showVideo, setShowVideo] = useState(true);

    return (
        <div
            className={`${
                isDesktop
                    ? ''
                    : 'w-[350px] sm:w-[450px] max-h-[80vh] bg-white px-4 py-2 rounded-md relative flex flex-col'
            } shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
            onClick={e => e.stopPropagation()}
        >
            <div
                className="absolute w-[28px] h-[28px] right-2 top-4 bg-gray-200 flex items-center justify-center cursor-pointer rounded-md"
                onClick={() => toggleFilter(false)}
            >
                <FontAwesomeIcon icon={faXmark} className="text-[#2e2a2a]" />
            </div>
            <p className="flex items-center gap-x-2 py-[10px] px-2 border-b border-b-gray-200">
                <FontAwesomeIcon icon={faFilter} className="text-lg text-[#0045a8]" />
                <span className="text-lg text-[#0045a8] font-[500] ">Lọc tìm kiếm</span>
            </p>

            {/* Diện tích */}
            <div className="overflow-y-scroll">
                <div className="border-b border-gray-200 p-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setShowArea(!showArea)}
                    >
                        <p className="font-semibold text-[15px]">Diện tích</p>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={`transition-transform duration-300 ${
                                showArea ? 'rotate-180' : ''
                            }`}
                        />
                    </div>

                    {showArea && (
                        <div className="flex flex-col gap-2 text-sm text-[#2e2a2a] mt-2">
                            {['Dưới 20 m²', '20-40 m²', '40-60 m²', '60-80 m²', 'Trên 80 m²'].map(
                                (item, i) => (
                                    <label
                                        key={i}
                                        className="flex items-center gap-2 cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name="area"
                                            className="accent-[#0045a8]"
                                        />
                                        {item}
                                    </label>
                                )
                            )}
                        </div>
                    )}
                </div>

                {/* Tiện nghi */}
                <div className="border-b border-gray-200 p-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setShowAmenities(!showAmenities)}
                    >
                        <p className="font-semibold text-[15px]">Tiện nghi</p>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={`transition-transform duration-300 ${
                                showAmenities ? 'rotate-180' : ''
                            }`}
                        />
                    </div>

                    {showAmenities && (
                        <div className="grid grid-cols-2 gap-2 text-sm text-[#2e2a2a] mt-2">
                            {[
                                'Gác lửng',
                                'Wifi',
                                'Vệ sinh trong',
                                'Phòng tắm',
                                'Bình nóng lạnh',
                                'Kệ bếp',
                                'Máy giặt',
                                'Tivi',
                                'Điều hòa',
                                'Tủ lạnh',
                                'Giường nệm',
                                'Tủ áo quần',
                                'Ban công/ sân thương',
                                'Thang máy',
                                'Bãi để xe riêng',
                                'Camera an ninh',
                                'Hồ bơi',
                                'Sân vườn',
                            ].map((item, i) => (
                                <label key={i} className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="accent-[#0045a8]" />
                                    {item}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Môi trường xung quanh */}
                <div className="border-b border-gray-200 p-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setShowEnvironment(!showEnvironment)}
                    >
                        <p className="font-semibold text-[15px]">Môi trường xung quanh</p>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={`transition-transform duration-300 ${
                                showEnvironment ? 'rotate-180' : ''
                            }`}
                        />
                    </div>

                    {showEnvironment && (
                        <div className="grid grid-cols-2 gap-2 text-sm text-[#2e2a2a] mt-2">
                            {[
                                'Chợ',
                                'Siêu thị',
                                'Bệnh viện',
                                'Trường học',
                                'Công viên',
                                'Bến xe bus',
                                'Trung tâm thể dục thể thao',
                            ].map((item, i) => (
                                <label key={i} className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="accent-[#0045a8]" />
                                    {item}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Đối tượng */}
                <div className="border-b border-gray-200 p-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setShowTarget(!showTarget)}
                    >
                        <p className="font-semibold text-[15px]">Đối tượng</p>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={`transition-transform duration-300 ${
                                showTarget ? 'rotate-180' : ''
                            }`}
                        />
                    </div>

                    {showTarget && (
                        <div className="flex flex-col gap-2 text-sm text-[#2e2a2a] mt-2">
                            {['Đi học', 'Đi làm', 'Gia đình', 'Cặp đôi'].map((item, i) => (
                                <label key={i} className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="accent-[#0045a8]" />
                                    {item}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Video Review */}
                <div className="border-b border-gray-200 p-3">
                    <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setShowVideo(!showVideo)}
                    >
                        <p className="font-semibold text-[15px]">Video Review</p>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className={`transition-transform duration-300 ${
                                showVideo ? 'rotate-180' : ''
                            }`}
                        />
                    </div>

                    {showVideo && (
                        <div className="mt-2">
                            <label className="flex items-center gap-2 cursor-pointer text-sm text-[#2e2a2a]">
                                <input type="checkbox" className="accent-[#0045a8]" /> Có video
                                review
                            </label>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="py-5 px-2 flex gap-2">
                <button className="flex-1 cursor-pointer bg-[#0045a8] text-white py-2 rounded-sm text-sm font-semibold hover:bg-[#003a90]">
                    Tìm ngay
                </button>
                <button className="flex-1 cursor-pointer bg-gray-200 text-[#2e2a2a] py-2 rounded-sm text-sm font-semibold hover:bg-gray-300">
                    Xóa bộ lọc
                </button>
            </div>
        </div>
    );
};

export default Filter;
