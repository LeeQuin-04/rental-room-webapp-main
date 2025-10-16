import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faArrowsRotate,
    faMapLocation,
    faMapPin,
} from '@fortawesome/free-solid-svg-icons';

import { useSearchFormState } from '../hooks/useSearchFormState';

const SearchForm = () => {
    const {
        type,
        setType,
        locationDropdown,
        toggleLocationDropdown,
        priceDropdown,
        togglePriceDropdown,
        areaDropdown,
        toggleAreaDropdown,
        typeLocation,
        setTypeLocation,
        openRange,
        setOpenRange,
        locationDropdownRef,
        priceDropdownRef,
        areaDropdownRef,
        locationButtonRef,
        priceButtonRef,
        areaButtonRef,
    } = useSearchFormState();

    return (
        <div className="w-full">
            {/* Type Tabs */}
            <ul className="flex w-full gap-x-[2px]">
                {[
                    { key: 'All', label: 'Tất cả' },
                    { key: 'Rental', label: 'Nhà trọ, phòng trọ' },
                    { key: 'EntireHouse', label: 'Nhà nguyên căn' },
                    { key: 'Apartment', label: 'Căn hộ' },
                ].map(item => (
                    <li
                        key={item.key}
                        onClick={() => setType(item.key)}
                        className={`cursor-pointer text-[12px] md:text-sm whitespace-nowrap lg:text-[15px] text-center px-2 lg:px-10 py-[10px] flex-1 lg:flex-none rounded-t-xl font-[600] ${
                            type === item.key
                                ? 'bg-[#0045a8] text-white'
                                : 'bg-[#e6ecf6] text-[#0045a8]'
                        }`}
                    >
                        {item.label}
                    </li>
                ))}
            </ul>

            <div className="bg-[#0045a8] p-5 rounded-bl-xl rounded-br-xl lg:rounded-tr-xl flex flex-wrap gap-x-2">
                {/* Location Dropdown */}
                <div className="relative w-full mb-2 lg:mb-0 lg:flex-2">
                    <div
                        ref={locationButtonRef}
                        onClick={toggleLocationDropdown}
                        className="p-[10px] rounded-md bg-white flex items-center gap-x-4 cursor-pointer"
                    >
                        <svg
                            version="1.1"
                            fill="#00b7ff"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="w-[20px] h-[20px]"
                        >
                            <g>
                                <path d="M172.625,102.4c-42.674,0-77.392,34.739-77.392,77.438c0,5.932,4.806,10.74,10.733,10.74c5.928,0,10.733-4.808,10.733-10.74c0-30.856,25.088-55.959,55.926-55.959c5.928,0,10.733-4.808,10.733-10.74C183.358,107.208,178.553,102.4,172.625,102.4z" />
                                <path d="M361.657,301.511c19.402-30.436,30.645-66.546,30.645-105.244C392.302,88.036,304.318,0,196.151,0c-38.676,0-74.765,11.25-105.182,30.663C66.734,46.123,46.11,66.759,30.659,91.008C11.257,121.444,0,157.568,0,196.267c0,108.217,87.998,196.266,196.151,196.266c38.676,0,74.779-11.264,105.197-30.677C325.582,346.396,346.206,325.76,361.657,301.511zM259.758,320.242c-19.075,9.842-40.708,15.403-63.607,15.403c-76.797,0-139.296-62.535-139.296-139.378c0-22.912,5.558-44.558,15.394-63.644c13.318-25.856,34.483-47.019,60.323-60.331c19.075-9.842,40.694-15.403,63.578-15.403c76.812,0,139.296,62.521,139.296,139.378c0,22.898-5.558,44.53-15.394,63.616C306.749,285.739,285.598,306.916,259.758,320.242z" />
                                <path d="M499.516,439.154L386.275,326.13c-16.119,23.552-36.771,44.202-60.309,60.345l113.241,113.024c8.329,8.334,19.246,12.501,30.148,12.501c10.916,0,21.833-4.167,30.162-12.501C516.161,482.83,516.161,455.822,499.516,439.154z" />
                            </g>
                        </svg>
                        <input
                            type="text"
                            className="w-full border-none outline-0 text-[13px] md:text-sm"
                            readOnly
                            placeholder="Bạn muốn tìm trọ ở đâu?"
                        />
                    </div>

                    {locationDropdown && (
                        <div
                            ref={locationDropdownRef}
                            className="absolute top-[120%] w-full bg-white left-0 shadow-lg rounded-md cursor-default z-50"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center border-b border-b-gray-200">
                                <div
                                    className={`${
                                        typeLocation === 'Address'
                                            ? 'text-[#0045a8] border-b-2 border-b-[#0045a8]'
                                            : 'text-[#65676b] border-b-2 border-b-transparent'
                                    } flex-1 py-3 px-5 flex items-center gap-x-2 cursor-pointer`}
                                    onClick={() => setTypeLocation('Address')}
                                >
                                    <FontAwesomeIcon icon={faMapPin} className="text-[16px]" />
                                    <span className="text-sm">Tìm kiếm theo vị trí</span>
                                </div>
                                <div
                                    className={`${
                                        typeLocation === 'Range'
                                            ? 'text-[#0045a8] border-b-2 border-b-[#0045a8]'
                                            : 'text-[#65676b] border-b-2 border-b-transparent'
                                    } flex-1 py-3 px-5 flex items-center gap-x-3 cursor-pointer`}
                                    onClick={() => setTypeLocation('Range')}
                                >
                                    <FontAwesomeIcon icon={faMapLocation} className="text-[16px]" />
                                    <span className="text-sm">Chọn khu vực</span>
                                </div>
                            </div>

                            <div className="p-5">
                                {typeLocation === 'Address' ? (
                                    <div>
                                        <label className="text-[15px] font-[600] text-[#2e2a2a] block mb-2">
                                            Địa chỉ hoặc tên địa điểm
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                                            placeholder="VD: xã Yên Lãng, thành phố Hà Nội..."
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label className="text-[15px] font-[600] text-[#2e2a2a] block mb-2">
                                            Chọn khu vực cụ thể
                                        </label>
                                        <div className="relative">
                                            <div
                                                onClick={() => setOpenRange(!openRange)}
                                                className="w-full cursor-pointer bg-[#f4f4f4] py-2 px-4 border mt-2 border-gray-300 rounded-md flex justify-between items-center"
                                            >
                                                <span className="text-[#2e2a2a] font-[500] text-[15px]">
                                                    Phường/Xã...
                                                </span>
                                                <FontAwesomeIcon
                                                    icon={faAngleDown}
                                                    className="text-[#2e2a2a] text-[12px]"
                                                />
                                            </div>
                                            {openRange && (
                                                <div className="absolute z-50 w-full left-0 right-0 mt-2 border border-gray-300 bg-white rounded-md shadow-lg">
                                                    <div className="flex items-center gap-x-2 p-2 border-b border-gray-200">
                                                        <FontAwesomeIcon
                                                            icon={faMapPin}
                                                            className="text-gray-400 text-sm"
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Tìm phường/xã..."
                                                            className="flex-1 outline-none text-sm text-gray-700"
                                                        />
                                                    </div>
                                                    <div className="max-h-40 overflow-y-auto">
                                                        {[
                                                            'Phường Phúc Xá',
                                                            'Phường Trúc Bạch',
                                                            'Phường Quán Thánh',
                                                            'Phường Nguyễn Trung Trực',
                                                            'Xã Yên Sở',
                                                        ].map((item, i) => (
                                                            <div
                                                                key={i}
                                                                className="px-4 py-2 text-[15px] text-[#2e2a2a] hover:bg-[#e8f4ff] cursor-pointer"
                                                                onClick={() => setOpenRange(false)}
                                                            >
                                                                {item}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-5 flex items-center justify-between border-t border-t-gray-200">
                                <div className="flex items-center gap-x-2 text-[#2e2a2a] cursor-pointer">
                                    <FontAwesomeIcon icon={faArrowsRotate} className="text-sm" />
                                    <span className="text-sm font-medium">Đặt lại</span>
                                </div>
                                <div className="px-3 py-2 text-sm text-white bg-[#0045a8] rounded-sm cursor-pointer">
                                    Tìm ngay
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Price Dropdown */}
                <div className="relative flex-1">
                    <div
                        ref={priceButtonRef}
                        onClick={togglePriceDropdown}
                        className="p-[10px] rounded-md bg-white flex items-center gap-x-4 cursor-pointer"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            stroke="#00b7ff"
                            strokeWidth="1.91"
                            className="w-[20px] h-[20px]"
                        >
                            <g id="dolar_coin">
                                <path d="M22.5,12A10.5,10.5,0,1,1,12,1.5,10.5,10.5,0,0,1,22.5,12"></path>
                                <path d="M9.14,15.82H13a1.91,1.91,0,0,0,1.91-1.91h0A1.9,1.9,0,0,0,13,12h-1.9a1.9,1.9,0,0,1-1.91-1.91h0a1.91,1.91,0,0,1,1.91-1.91h3.81"></path>
                                <line x1="12" y1="6.27" x2="12" y2="8.18"></line>
                                <line x1="12" y1="15.82" x2="12" y2="17.73"></line>
                            </g>
                        </svg>
                        <span className="text-[#898a8b] text-[13px] md:text-sm lg:text-[15px]">
                            Mức giá
                        </span>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className="text-[#bd3535] text-sm lg:text-[15px] ml-auto"
                        />
                    </div>

                    {priceDropdown && (
                        <div
                            ref={priceDropdownRef}
                            className="absolute top-[120%] w-full bg-white left-0 shadow-lg rounded-md cursor-default z-50"
                            onClick={e => e.stopPropagation()}
                        >
                            <ul className="p-4 flex flex-col gap-y-2 text-sm font-500 text-[#2e2a2a]">
                                {[
                                    'Tất cả mức giá',
                                    'Dưới 1 triệu',
                                    '1 - 10 triệu',
                                    '10 - 30 triệu',
                                    '30 - 50 triệu',
                                    'Trên 50 triệu',
                                    'Trên 100 triệu',
                                ].map((price, i) => (
                                    <li
                                        key={i}
                                        className="py-2 px-1 cursor-pointer hover:bg-[#f4f4f4] rounded-md"
                                    >
                                        {price}
                                    </li>
                                ))}
                            </ul>

                            <div className="p-5 flex items-center justify-between border-t border-t-gray-200">
                                <div className="flex items-center gap-x-2 text-[#2e2a2a] cursor-pointer">
                                    <FontAwesomeIcon icon={faArrowsRotate} className="text-sm" />
                                    <span className="text-sm font-medium">Đặt lại</span>
                                </div>
                                <div className="px-3 py-2 text-sm text-white bg-[#0045a8] rounded-sm cursor-pointer">
                                    Tìm ngay
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Area Dropdown */}
                <div className="relative flex-1">
                    <div
                        ref={areaButtonRef}
                        className="p-[10px] rounded-md bg-white flex items-center gap-x-4 cursor-pointer"
                        onClick={toggleAreaDropdown}
                    >
                        <svg
                            fill="#00b7ff"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-[20px] h-[20px]"
                        >
                            <path d="M20 17h-16c-.552 0-1-.447-1-1v-3c0-.68.234-1.346.658-1.874l4-5c.98-1.226,2.885-1.469,4.143-.524l1.674,1.254,2.185-2.729c.57-.717,1.424-1.127,2.341-1.127.679,0,1.343.232,1.873.657.716.572,1.126,1.426,1.126,2.343v10c0,.553-.448,1-1,1zm-15-2h14v-9c0-.307-.137-.59-.375-.779-.227-.183-.465-.221-.624-.221-.306,0-.591.137-.782.376l-2.789,3.485c-.337.423-.949.5-1.381.176l-2.449-1.837c-.422-.316-1.055-.233-1.381.176l-4,5c-.181.228-.219.464-.219.624v2zM20,21h-16c-.552,0-1-.447-1-1s.448-1,1-1h16c.552,0,1,.447,1,1s-.448,1-1,1z" />
                        </svg>
                        <span className="text-[#898a8b] text-[13px] md:text-sm lg:text-[15px]">
                            Diện tích
                        </span>
                        <FontAwesomeIcon
                            icon={faAngleDown}
                            className="text-[#bd3535] text-sm lg:text-[15px] ml-auto"
                        />
                    </div>

                    {areaDropdown && (
                        <div
                            ref={areaDropdownRef}
                            className="absolute top-[120%] w-full bg-white left-0 shadow-lg rounded-md cursor-default z-50"
                            onClick={e => e.stopPropagation()}
                        >
                            <ul className="p-4 flex flex-col gap-y-2 text-sm font-500 text-[#2e2a2a]">
                                {[
                                    'Dưới 20 m²',
                                    '20 m² - 40 m²',
                                    '40 m² - 60 m²',
                                    '60 m² - 80 m²',
                                    'Trên 80 m²',
                                ].map((area, i) => (
                                    <li
                                        key={i}
                                        className="py-2 px-1 cursor-pointer hover:bg-[#f4f4f4] rounded-md"
                                    >
                                        {area}
                                    </li>
                                ))}
                            </ul>

                            <div className="p-5 flex items-center justify-between border-t border-t-gray-200">
                                <div className="flex items-center gap-x-2 text-[#2e2a2a] cursor-pointer">
                                    <FontAwesomeIcon icon={faArrowsRotate} className="text-sm" />
                                    <span className="text-sm font-medium">Đặt lại</span>
                                </div>
                                <div className="px-3 py-2 text-sm text-white bg-[#0045a8] rounded-sm cursor-pointer">
                                    Tìm ngay
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Search Button */}
                <div className="p-[10px] rounded-md bg-[#ff5c00] w-full mt-2 lg:mt-0 lg:flex-1 flex items-center justify-center space-x-2 cursor-pointer hover:bg-orange-600 transition">
                    <svg
                        version="1.1"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-[20px] h-[20px]"
                    >
                        <g>
                            <path d="M172.625,102.4c-42.674,0-77.392,34.739-77.392,77.438c0,5.932,4.806,10.74,10.733,10.74c5.928,0,10.733-4.808,10.733-10.74c0-30.856,25.088-55.959,55.926-55.959c5.928,0,10.733-4.808,10.733-10.74C183.358,107.208,178.553,102.4,172.625,102.4z" />
                            <path d="M361.657,301.511c19.402-30.436,30.645-66.546,30.645-105.244C392.302,88.036,304.318,0,196.151,0c-38.676,0-74.765,11.25-105.182,30.663C66.734,46.123,46.11,66.759,30.659,91.008C11.257,121.444,0,157.568,0,196.267c0,108.217,87.998,196.266,196.151,196.266c38.676,0,74.779-11.264,105.197-30.677C325.582,346.396,346.206,325.76,361.657,301.511zM259.758,320.242c-19.075,9.842-40.708,15.403-63.607,15.403c-76.797,0-139.296-62.535-139.296-139.378c0-22.912,5.558-44.558,15.394-63.644c13.318-25.856,34.483-47.019,60.323-60.331c19.075-9.842,40.694-15.403,63.578-15.403c76.812,0,139.296,62.521,139.296,139.378c0,22.898-5.558,44.53-15.394,63.616C306.749,285.739,285.598,306.916,259.758,320.242z" />
                            <path d="M499.516,439.154L386.275,326.13c-16.119,23.552-36.771,44.202-60.309,60.345l113.241,113.024c8.329,8.334,19.246,12.501,30.148,12.501c10.916,0,21.833-4.167,30.162-12.501C516.161,482.83,516.161,455.822,499.516,439.154z" />
                        </g>
                    </svg>
                    <span className="text-[15px] text-white font-semibold">Tìm kiếm</span>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;
