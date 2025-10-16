// frontend/src/pages/RentalListPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumb from '../components/Breadcrumb';
// [MỚI] Import component ListingCard
import ListingCard from '../components/ListingCard';

const RentalListPage = () => {
    const { categorySlug } = useParams();
    const [listings, setListings] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
    
    useEffect(() => {
        const staticPages = ['videos', 'contact'];
        if (staticPages.includes(categorySlug)) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            window.scrollTo(0, 0);
            
            try {
                const listingsPromise = axios.get(`/api/listings/category/${categorySlug}`);
                const categoryDetailsPromise = axios.get(`/api/listings/category-details/${categorySlug}`);
                
                const [listingsResponse, categoryDetailsResponse] = await Promise.all([
                    listingsPromise,
                    categoryDetailsPromise
                ]);
                
                setListings(listingsResponse.data);
                setCategoryInfo(categoryDetailsResponse.data);
                setTitle(`CHO THUÊ ${categoryDetailsResponse.data.name.toUpperCase()} GIÁ RẺ, MỚI NHẤT`);
            } catch (err) {
                console.error(`Lỗi tải dữ liệu cho ${categorySlug}:`, err);
                setError('Không tìm thấy nội dung hoặc đã có lỗi xảy ra.');
                setTitle('Không tìm thấy trang');
                setListings([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categorySlug]);

    return (
        <div className="min-h-screen mt-[72px]">
            {/* Thanh filter bar */}
            <div className="bg-[#f0f2f5] 2xl:px-48 xl:px-32 md:px-10 px-[10px] py-4">
                 {/* Giữ lại JSX của thanh filter của bạn nếu muốn */}
            </div>

            <div className="2xl:px-48 xl:px-32 md:px-10 px-[10px] pb-10">
                <div className="mt-10">
                    <Breadcrumb />
                </div>
                <h1 className="text-lg md:text-2xl font-bold text-[#2e2a2a]">
                    {loading ? 'Đang tải tiêu đề...' : title}
                </h1>
                
                <div className="flex mt-6 gap-x-4">
                    <div className="flex-[3] p-5 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md">
                        {loading ? (
                            <p>Đang tải danh sách...</p>
                        ) : error ? (
                            <p className="text-red-500">{error}</p>
                        ) : listings.length > 0 ? (
                            <>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-lg font-semibold text-[#2e2a2a]">
                                        Tổng {listings.length} kết quả
                                    </p>
                                </div>
                                <div className="grid 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                                    {/* [CẬP NHẬT] Sử dụng component ListingCard ở đây */}
                                    {listings.map(listing => (
                                        <ListingCard key={listing.id} listing={listing} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <p>Chưa có tin đăng nào trong mục này.</p>
                        )}
                    </div>
                    <div className="flex-1 lg:block hidden">
                        <div className="p-5 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md">
                           Bộ lọc sẽ hiển thị ở đây
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentalListPage;