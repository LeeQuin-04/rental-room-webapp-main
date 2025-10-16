import React, { useState, useEffect } from 'react';
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTimes } from 'react-icons/fa';

const VideoReview = () => {
    const [activeVideo, setActiveVideo] = useState(null);
    const [visibleCount, setVisibleCount] = useState(5);

    // 🔹 Danh sách video demo thật từ YouTube
    const videos = [
        {
            id: 1,
            videoId: 'oFkJThqoFXU',
            author: 'Trọ Mới',
            title: 'Nhà Trọ Tại Bến Dốc, Hữu Lê, Hữu Hòa, Thanh Trì, Hà Nội',
            address: 'Thanh Trì, Hà Nội',
            price: '3,5 triệu/tháng',
            rating: 4.1,
        },
        {
            id: 2,
            videoId: 'nwWTgClaZH4',
            author: 'Trọ Mới',
            title: 'Nhà Trọ Tại Thanh Xuân, Thành phố Hà Nội',
            address: 'Thanh Xuân, TP.Hà Nội',
            price: '3,4 triệu/tháng',
            rating: 4.6,
        },
        {
            id: 3,
            videoId: 'tfIQglal_LE',
            author: 'Trọ Mới',
            title: 'Ký túc xá phường Văn Miếu, Thành phố Hà Nội',
            address: 'Văn Miếu, TP.Hà Nội',
            price: '1,9 triệu/tháng',
            rating: 4.3,
        },
        {
            id: 4,
            videoId: 'DLgoRmB1WcI',
            author: 'Trọ Mới',
            title: 'Ký túc xá - Đại học Y Dược, Quận 11, TP.HCM',
            address: 'Quận 11, TP.HCM',
            price: '3,5 triệu/tháng',
            rating: 4.2,
        },
        {
            id: 5,
            videoId: '8pievqDWRwI',
            author: 'Trọ Mới',
            title: 'Ký túc xá quận 10 đầy đủ tiện nghi',
            address: 'Quận 10, TP.HCM',
            price: '1,7 triệu/tháng',
            rating: 4.1,
        },
        {
            id: 6,
            videoId: 'KqIUsSgXGgk',
            author: 'Trọ Mới',
            title: 'Phòng trọ mini giá rẻ gần Đại học Quốc Gia TP.HCM',
            address: 'Thủ Đức, TP.HCM',
            price: '2,8 triệu/tháng',
            rating: 4.5,
        },
        {
            id: 7,
            videoId: '4OliFfKZPZk',
            author: 'Trọ Mới',
            title: 'Phòng trọ cao cấp trung tâm Phường Hai Bà Trưng',
            address: 'Phường Hai Bà Trưng, TP.Hà Nội',
            price: '6,2 triệu/tháng',
            rating: 4.7,
        },
        {
            id: 8,
            videoId: 'kQaeW4Aozq0',
            author: 'Trọ Mới',
            title: 'Phòng trọ gần Đại học Bách Khoa Hà Nội',
            address: 'Phường Đống Đa, TP.Hà Nội',
            price: '4,1 triệu/tháng',
            rating: 4.4,
        },
        {
            id: 9,
            videoId: 'eYGxL5zU9NQ',
            author: 'Trọ Mới',
            title: 'Phòng trọ gần Đại học Bách Khoa Hà Nội, đầy đủ nội thất',
            address: 'Hai Bà Trưng, Hà Nội',
            price: '2,5 triệu/tháng',
            rating: 4.3,
        },
        {
            id: 10,
            videoId: 'kTqkLz4jG0o',
            author: 'Trọ Mới',
            title: 'Phòng trọ mới xây khu vực Đống Đa, Hà Nội',
            address: 'Đống Đa, Hà Nội',
            price: '2,8 triệu/tháng',
            rating: 4.4,
        },
        {
            id: 11,
            videoId: 'dxNfULmQwPw',
            author: 'Trọ Mới',
            title: 'Phòng trọ mới xây khu vực Cầu Giấy, Hà Nội',
            address: 'Cầu Giấy, Hà Nội',
            price: '3,2 triệu/tháng',
            rating: 4.6,
        },
        {
            id: 12,
            videoId: 'bHkZJZpVf9k',
            author: 'Trọ Mới',
            title: 'Phòng trọ mini đầy đủ nội thất gần Aeon Mall Long Biên',
            address: 'Long Biên, TP.Hà Nội',
            price: '3,8 triệu/tháng',
            rating: 4.5,
        },
        {
            id: 13,
            videoId: 'L7j5PtWnStM',
            author: 'Trọ Mới',
            title: 'Phòng trọ tiện nghi cho sinh viên Đại học Y Hà Nội',
            address: 'Đống Đa, Hà Nội',
            price: '2,4 triệu/tháng',
            rating: 4.2,
        },
        {
            id: 14,
            videoId: 'b_DYfa3n40A',
            author: 'Trọ Mới',
            title: 'Phòng trọ đầy đủ tiện nghi khu vực Quận 9',
            address: 'Quận 9, TP.HCM',
            price: '3,0 triệu/tháng',
            rating: 4.3,
        },
        {
            id: 15,
            videoId: 'Ofcyb5uE1RE',
            author: 'Trọ Mới',
            title: 'Chung cư Thạch Bàn, Long Biên, Hà Nội',
            address: 'Thạch Bàn, Long Biên, Hà Nội',
            price: '4,8 triệu/tháng',
            rating: 4.8,
        },
    ];

    // Responsive số lượng video hiển thị ban đầu
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setVisibleCount(2);
            else if (window.innerWidth < 1024) setVisibleCount(5);
            else setVisibleCount(5);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 5);
    };

    return (
        <div className="bg-[#0045a8] py-10 flex flex-col items-center gap-y-4">
            <h3 className="text-white text-lg md:text-2xl font-[700] uppercase text-center">
                Video Review Trọ Mới
            </h3>

            {/* Danh sách video */}
            <div className="w-full 2xl:px-40 xl:px-20 px-10 mt-5">
                <div
                    className="
            grid 
            gap-5 
            justify-center
            sm:grid-cols-1 
            md:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            2xl:grid-cols-5
          "
                >
                    {videos.slice(0, visibleCount).map(v => (
                        <div
                            key={v.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
                        >
                            {/* Thumbnail */}
                            <div
                                className="w-full flex items-center justify-center relative group cursor-pointer p-2"
                                style={{ height: '260px' }}
                                onClick={() => setActiveVideo(v.videoId)}
                            >
                                <div className="w-full h-full rounded-md bg-gradient-to-br from-gray-200 to-gray-500 relative group overflow-hidden">
                                    <img
                                        src={`https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg`}
                                        alt="video thumbnail"
                                        className="w-full h-full object-cover"
                                        onError={e => {
                                            e.target.src = `https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                                    <div className="text-white absolute bottom-4 left-4 border-2 flex items-center justify-center py-[9px] px-[7px] rounded-full w-fit group-hover:scale-130 transition-transform duration-500">
                                        <FontAwesomeIcon icon={faPlay} />
                                    </div>
                                </div>
                            </div>

                            {/* Thông tin video */}
                            <div className="p-3 flex flex-col gap-y-2">
                                <p className="flex items-center gap-x-2 text-gray-600 text-sm">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M7.28205 0C3.81795 0 1 2.81795 1 6.28205C1 9.95651 4.3722 12.1836 6.60358 13.6575L6.98338 13.9096C7.07385 13.9699 7.17795 14 7.28205 14C7.38615 14 7.49026 13.9699 7.58072 13.9096L7.96052 13.6575C10.1919 12.1836 13.5641 9.95651 13.5641 6.28205C13.5641 2.81795 10.7462 0 7.28205 0ZM7.36749 12.7587L7.28205 12.8155L7.19661 12.7587C5.03559 11.3314 2.07692 9.37713 2.07692 6.28205C2.07692 3.41169 4.41169 1.07692 7.28205 1.07692C10.1524 1.07692 12.4872 3.41169 12.4872 6.28205C12.4872 9.37713 9.5278 11.3321 7.36749 12.7587ZM7.28205 3.94872C5.99549 3.94872 4.94872 4.99549 4.94872 6.28205C4.94872 7.56862 5.99549 8.61539 7.28205 8.61539C8.56862 8.61539 9.61539 7.56862 9.61539 6.28205C9.61539 4.99549 8.56862 3.94872 7.28205 3.94872Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                    <span>{v.address}</span>
                                </p>
                                <h4 className="font-[500] cursor-pointer text-[15px] sm:text-[16px] text-[#2e2a2a] one-line">
                                    {v.title}
                                </h4>
                                <p className="text-[#ff5c00] text-[15px] font-semibold">
                                    {v.price}
                                </p>
                                <div className="flex w-fit rounded-sm items-center gap-x-2 py-[2px] px-2 bg-[#f4f4f4]">
                                    <FontAwesomeIcon icon={faStar} className="text-[#ff5c00]" />
                                    <span>{v.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Nút xem thêm */}
            {visibleCount < videos.length && (
                <button
                    onClick={handleShowMore}
                    className="mt-6 px-[13px] cursor-pointer text-sm py-[11px] bg-white text-[#0045a8] hover:bg-[#00b7ff] hover:text-white font-semibold rounded transition-colors duration-300"
                >
                    Xem thêm nhiều hơn
                </button>
            )}

            {/* Popup video */}
            {activeVideo && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="relative bg-white rounded-lg overflow-hidden w-full max-w-3xl shadow-2xl">
                        <button
                            className="absolute top-3 right-3 cursor-pointer text-gray-600 text-2xl z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition"
                            onClick={() => setActiveVideo(null)}
                        >
                            <FaTimes />
                        </button>

                        <div className="p-4">
                            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden mb-4">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Video đang phát
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Xem trực tiếp trên{' '}
                                    <a
                                        href={`https://www.youtube.com/watch?v=${activeVideo}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        YouTube
                                    </a>
                                </p>
                            </div>

                            <button
                                onClick={() => setActiveVideo(null)}
                                className="w-full px-4 py-2 cursor-pointer bg-gray-300 text-gray-800 font-semibold rounded hover:bg-gray-400 transition"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoReview;
