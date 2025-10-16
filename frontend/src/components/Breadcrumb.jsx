import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    const breadcrumbNameMap = {
        'rental-rooms': 'Nhà trọ, phòng trọ',
        'whole-houses': 'Nhà nguyên căn',
        apartments: 'Căn hộ',
    };

    return (
        <nav className="text-[12px] text-gray-500 mb-4">
            <Link to="/" className="text-blue-600 hover:text-[#ff5c00]">
                Trang chủ
            </Link>

            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;

                return (
                    <span key={to}>
                        {' / '}
                        {isLast ? (
                            <span className="text-gray-700">
                                {breadcrumbNameMap[value] || value}
                            </span>
                        ) : (
                            <Link to={to} className="text-blue-600 hover:underline">
                                {breadcrumbNameMap[value] || value}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;
