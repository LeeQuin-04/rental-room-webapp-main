// frontend/src/components/RentalListing.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// [MỚI] Import component ListingCard
import ListingCard from './ListingCard';

const RentalListing = ({ title, listType, categorySlug }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListings = async () => {
            setLoading(true);
            setError(null);
            try {
                let url = '';
                if (listType === 'hot') {
                    url = '/api/listings/hot';
                } else if (listType === 'category' && categorySlug) {
                    url = `/api/listings/category/${categorySlug}?limit=5`;
                } else {
                    setLoading(false);
                    return;
                }
                
                const response = await axios.get(url);
                setListings(response.data);
            } catch (err) {
                console.error("Lỗi khi tải danh sách tin:", err);
                setError("Không thể tải dữ liệu.");
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, [listType, categorySlug]);

    return (
        <div className="px-2 py-5 sm:p-5 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md">
            <h3 className="text-[#0045a8] md:text-2xl font-bold uppercase mb-6 text-[18px]">{title}</h3>
            
            {loading && <p>Đang tải...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && (
                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    {/* [CẬP NHẬT] Sử dụng component ListingCard ở đây */}
                    {listings.map(listing => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                </div>
            )}
            
            {listType === 'category' && categorySlug && (
                <Link to={`/${categorySlug}`} className="mt-8 sm:mt-12 text-[#0045a8] hover:text-[#00b7ff] border border-[#0045a8] hover:border-[#00b7ff] px-[13px] py-[9px] rounded-sm flex sm:inline-flex items-center justify-center gap-x-2 cursor-pointer transition-colors whitespace-nowrap duration-300">
                    <span className="text-sm font-semibold">Xem tất cả </span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                </Link>
            )}
        </div>
    );
};

export default RentalListing;