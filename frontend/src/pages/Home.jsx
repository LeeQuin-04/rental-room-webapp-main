import Banner from '../components/Banner';
import SearchForm from '../components/SearchForm';
import Slider from '../components/Slider';
import RentalListing from '../components/RentalListing';
import DiscoverRentalRoom from '../components/DiscoverRentalRoom';
import {
    banner_ohdidi,
    badinh_img,
    dongda_img,
    tayho_img,
    thanhxuan_img,
    tuliem_img,
    longbien_img,
    banner_user,
} from '../assets/assets';

const Home = () => {
    const wards = [
        { name: 'Long Biên', image: longbien_img },
        { name: 'Thanh Xuân', image: thanhxuan_img },
        { name: 'Đống Đa', image: dongda_img },
        { name: 'Tây Hồ', image: tayho_img },
        { name: 'Từ Liêm', image: tuliem_img },
        { name: 'Ba Đình', image: badinh_img },
    ];

    const wardsData = [
        { name: 'Phường Cầu Diễn', rooms: 1320 },
        { name: 'Phường Trung Hòa', rooms: 1850 },
        { name: 'Phường Kim Giang', rooms: 1624 },
        { name: 'Phường Nghĩa Tân', rooms: 2117 },
        { name: 'Phường Dịch Vọng Hậu', rooms: 2453 },
        { name: 'Phường Mai Dịch', rooms: 1938 },
        { name: 'Phường Phương Liệt', rooms: 1589 },
        { name: 'Phường Láng Thượng', rooms: 1772 },
        { name: 'Phường Mễ Trì', rooms: 2285 },
        { name: 'Phường Yên Hòa', rooms: 2030 },
        { name: 'Phường Khương Trung', rooms: 1741 },
        { name: 'Phường Bách Khoa', rooms: 1916 },
    ];

    return (
        <div>
            <div className="relative mt-[72px]">
                <Banner />
            </div>

            <div className="relative -top-24 sm:-top-20 md:-top-24 lg:-top-16 2xl:px-48 2xl:pr-96 xl:px-32 md:px-10 px-[10px]">
                <SearchForm />
            </div>

            <div className="2xl:px-48 xl:px-32 md:px-10 px-[10px] -mt-6 sm:mt-0">
                <Slider />
            </div>

            {/* [CẬP NHẬT] Section HOT */}
            <div className="2xl:px-48 xl:px-32 md:px-10 px-[10px]">
                <RentalListing
                    title="Lựa chọn chỗ ở HOT"
                    listType="hot"
                />
            </div>

            <div className="my-10">
                <DiscoverRentalRoom />
            </div>

            {/* [CẬP NHẬT] Section Nhà nguyên căn */}
            <div className="2xl:px-48 xl:px-32 md:px-10 px-[10px]">
                <RentalListing
                    title="Nhà nguyên căn cho thuê"
                    listType="category"
                    categorySlug="nha-nguyen-can"
                />
            </div>

            <div className="2xl:px-48 xl:px-32 md:px-10 px-[10px] mt-5">
                <div className="relative w-full xl:aspect-[5/1] sm:aspect-[3/1] aspect-[2/1] group overflow-hidden rounded-lg">
                    <img
                        src={banner_ohdidi}
                        alt="banner-ohdidi"
                        className="w-full h-full rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </div>
            </div>

            {/* [CẬP NHẬT] Section Căn hộ */}
            <div className="2xl:px-48 xl:px-32 md:px-10 px-[10px] mt-10">
                <RentalListing
                    title="Căn hộ cho thuê"
                    listType="category"
                    categorySlug="can-ho"
                />
            </div>

            {/* --- Các section còn lại của trang Home được giữ nguyên --- */}
            <div className="2xl:px-48 xl:px-32 md:px-10 px-[10px] mt-10">
                <h3 className="text-[#0045a8] md:text-2xl font-bold uppercase text-[18px] text-center mb-8">
                    Các địa điểm nổi bật
                </h3>
                <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
                    {wards.map((ward, index) => (
                        <div
                            key={index}
                            className="flex flex-col bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl group"
                        >
                            <div className="flex-2 aspect-square">
                                <img
                                    src={ward.image}
                                    alt={ward.name}
                                    className="w-full h-full rounded-tl-lg rounded-tr-lg"
                                />
                            </div>
                            <p className="px-2 py-4 text-[#2e2a2a] md:text-lg text-sm font-bold group-hover:text-[#00b7ff] transition-all duration-300 whitespace-nowrap">
                                {ward.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="2xl:px-48 xl:px-32 md:px-10 px-[10px] mt-10">
                <div className="px-2 py-5 sm:p-5 shadow-md rounded-md">
                    <h3 className="text-[#0045a8] md:text-2xl font-bold uppercase text-[18px] mb-2">
                        Khám phá thêm Trọ Mới ở các địa điểm khác
                    </h3>
                    <p className="text-[#898a8b] text-sm mb-6">
                        Dưới đây là tổng hợp các tỉnh thành có nhiều trọ mới và được quan tâm nhất
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4  gap-6 ">
                        {wardsData.map((ward, index) => (
                            <div key={index}>
                                <p className="text-[#2e2a2a] text-[13px] lg:text-[15px] font-[500]">
                                    {ward.name}
                                </p>
                                <p className="text-[#595959] text-[13px]">{ward.rooms} phòng trọ</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="2xl:px-48 xl:px-32 md:px-10 px-[10px] mt-5 sm:mt-10">
                <div className="w-full lg:aspect-[7/2] aspect-[7/3]">
                    <img
                        src={banner_user}
                        alt="banner-user"
                        className="rounded-lg w-full h-full object-center object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;