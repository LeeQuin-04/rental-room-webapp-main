import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const DiscoverRentalRoom = () => {
    const [activeVideo, setActiveVideo] = useState(null);
    const [videosPerView, setVideosPerView] = useState(5);

    const videos = [
        {
            id: 1,
            videoId: 'oFkJThqoFXU',
            author: 'tromoi.hcm',
            title: 'Nhà Trọ Tại Bến Dốc, Hữu Lê, Hữu Hòa, Thanh Trì, Hà Nội',
            address: 'Thạnh Triều, Thạnh Tây - Hà Nội',
            price: '3,5 triệu/tháng',
            rating: 4.1,
        },
        {
            id: 2,
            videoId: 'nwWTgClaZH4',
            author: 'tromoi.hcm',
            title: 'Nhà Trọ Tại Bến Dốc, Hữu Lê, Hữu Hòa, Thanh Trì, Hà Nội ',
            address: 'Bình Tân, Thành phố Hồ Chí Minh',
            price: '3,4 triệu/tháng',
            rating: 4.6,
        },
        {
            id: 3,
            videoId: 'tfIQglal_LE',
            author: 'tromoi.hcm',
            title: 'Ký túc xá đường Trần Thị Nghị, Gò Vấp, Thành phố Hồ Chí Minh',
            address: 'Gò Vấp, Thành phố Hồ Chí Minh',
            price: '1,9 triệu/tháng',
            rating: 4.3,
        },
        {
            id: 4,
            videoId: 'DLgoRmB1WcI',
            author: 'tromoi.hcm',
            title: 'Ký túc xá - Đại học Y Dược, Quận 11, Thành phố Hồ Chí Minh',
            address: 'Quận 11, Thành phố Hồ Chí Minh',
            price: '3,5 triệu/tháng',
            rating: 4.2,
        },
        {
            id: 5,
            videoId: '8pievqDWRwI',
            author: 'tromoi.hcm',
            title: 'Ký túc xá quận 10, Thành phố Hồ Chí Minh đầy đủ tiện nghi',
            address: 'Quận 10, Thành phố Hồ Chí Minh',
            price: '1,7 triệu/tháng',
            rating: 4.1,
        },
        {
            id: 6,
            videoId: '9wDSHSaKu0M',
            author: 'tromoi.hcm',
            title: 'Ký túc xá quận 10, Thành phố Hồ Chí Minh đầy đủ tiện nghi',
            address: 'Quận 10, Thành phố Hồ Chí Minh',
            price: '1,7 triệu/tháng',
            rating: 4.1,
        },
        {
            id: 7,
            videoId: '9wDSHSaKu0M',
            author: 'tromoi.hcm',
            title: 'Ký túc xá Quận 10, Thành phố Hồ Chí Minh đầy đủ tiện nghi',
            address: 'Quận 10, Thành phố Hồ Chí Minh',
            price: '1,7 triệu/tháng',
            rating: 4.1,
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setVideosPerView(1);
            } else if (window.innerWidth < 768) {
                setVideosPerView(2);
            } else if (window.innerWidth < 1024) {
                setVideosPerView(3);
            } else if (window.innerWidth < 1536) {
                setVideosPerView(4);
            } else {
                setVideosPerView(5);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const videoWidth = `calc(${100 / videosPerView}% - ${
        (videosPerView - 1) * 0.8
    }rem / ${videosPerView})`;

    return (
        <div className="bg-[#0045a8] py-10 flex flex-col items-center gap-y-4">
            <h3 className="text-white text-lg md:text-2xl font-[700] uppercase text-center">
                Trải nghiệm trọ mới tại các địa điểm ở Hà Nội
            </h3>
            <ul className="flex gap-x-4 gap-y-4 text-white flex-wrap justify-center">
                <li className="cursor-pointer sm:py-2 sm:px-3 py-[6px] px-2 bg-white text-[#2e2a2a] hover:text-[#00b7ff] transition-colors duration-300 text-sm rounded-sm">
                    Tất cả
                </li>
                <li className="cursor-pointer sm:py-2 sm:px-3 py-[6px] px-2  bg-white text-[#2e2a2a] hover:text-[#00b7ff] transition-colors duration-300 text-sm rounded-sm">
                    Phường Hà Đông
                </li>
                <li className="cursor-pointer sm:py-2 sm:px-3 py-[6px] px-2 bg-white text-[#2e2a2a] hover:text-[#00b7ff] transition-colors duration-300 text-sm rounded-sm">
                    Phường Cầu Giấy
                </li>
                <li className="cursor-pointer sm:py-2 sm:px-3 py-[6px] px-2 bg-white text-[#2e2a2a] hover:text-[#00b7ff] transition-colors duration-300 text-sm rounded-sm">
                    Phường Long Biên
                </li>
                <li className="cursor-pointer sm:py-2 sm:px-3 py-[6px] px-2 bg-white text-[#2e2a2a] hover:text-[#00b7ff] transition-colors duration-300 text-sm rounded-sm">
                    Xã Thạch Thất
                </li>
                <li className="cursor-pointer sm:py-2 sm:px-3 py-[6px] px-2 bg-white text-[#2e2a2a] hover:text-[#00b7ff] transition-colors duration-300 text-sm rounded-sm">
                    Xã Hoà Lạc
                </li>
                <li className="cursor-pointer sm:py-2 sm:px-3 py-[6px] px-2 bg-white text-[#2e2a2a] hover:text-[#00b7ff] transition-colors duration-300 text-sm rounded-sm">
                    Xã Quốc Oai
                </li>
            </ul>

            {/* List Video */}
            <div className="w-full overflow-hidden 2xl:px-40 xl:px-20 px-10 mt-5">
                <div
                    className="flex gap-5 pb-4  overflow-x-auto list-video"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {videos.map(v => (
                        <div
                            key={v.id}
                            style={{ width: videoWidth, minWidth: videoWidth }}
                            className="bg-white rounded-lg shadow-lg flex-shrink-0 overflow-hidden hover:shadow-xl transition"
                        >
                            <div
                                className="w-full flex items-center justify-center relative group cursor-pointer p-2"
                                style={{ height: '400px' }}
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

                            <div className="p-3 flex flex-col gap-y-2">
                                <p className="flex items-center gap-x-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="12"
                                        height="12"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M7.28205 0C3.81795 0 1 2.81795 1 6.28205C1 9.95651 4.3722 12.1836 6.60358 13.6575L6.98338 13.9096C7.07385 13.9699 7.17795 14 7.28205 14C7.38615 14 7.49026 13.9699 7.58072 13.9096L7.96052 13.6575C10.1919 12.1836 13.5641 9.95651 13.5641 6.28205C13.5641 2.81795 10.7462 0 7.28205 0ZM7.36749 12.7587L7.28205 12.8155L7.19661 12.7587C5.03559 11.3314 2.07692 9.37713 2.07692 6.28205C2.07692 3.41169 4.41169 1.07692 7.28205 1.07692C10.1524 1.07692 12.4872 3.41169 12.4872 6.28205C12.4872 9.37713 9.5278 11.3321 7.36749 12.7587ZM7.28205 3.94872C5.99549 3.94872 4.94872 4.99549 4.94872 6.28205C4.94872 7.56862 5.99549 8.61539 7.28205 8.61539C8.56862 8.61539 9.61539 7.56862 9.61539 6.28205C9.61539 4.99549 8.56862 3.94872 7.28205 3.94872ZM7.28205 7.53846C6.58923 7.53846 6.02564 6.97487 6.02564 6.28205C6.02564 5.58923 6.58923 5.02564 7.28205 5.02564C7.97487 5.02564 8.53846 5.58923 8.53846 6.28205C8.53846 6.97487 7.97487 7.53846 7.28205 7.53846Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                    <span className="text-[13px] text-gray-600">{v.address}</span>
                                </p>
                                <h4 className="font-[500] cursor-pointer text-[14px] sm:text-[16px] text-[#2e2a2a] one-line">
                                    {v.title}
                                </h4>
                                <p className="text-[#ff5c00] text-[15px] font-semibold">
                                    {v.price}
                                </p>
                                <div className="flex w-fit rounded-sm items-center gap-x-2 py-[2px] px-2 bg-[#f4f4f4] ">
                                    <FontAwesomeIcon icon={faStar} className="text-[#ff5c00]" />
                                    <span>{v.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button className="mt-6 px-[13px] cursor-pointer text-sm py-[11px] bg-white text-[#0045a8] hover:bg-[#00b7ff] hover:text-white font-semibold  rounded transition-colors duration-300">
                Xem thêm nhiều hơn
            </button>

            {/* Open Video Modal */}
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
                            {/* YouTube Embed */}
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
                                    Bạn có thể xem video trực tiếp tại{' '}
                                    <a
                                        href={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                                        target="_blank"
                                    >
                                        đây
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

export default DiscoverRentalRoom;
