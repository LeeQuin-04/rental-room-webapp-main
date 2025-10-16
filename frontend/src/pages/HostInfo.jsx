import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { logo } from '../assets/assets';

const HostInfo = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        address: '', 
    });
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('auth_user'));
        if (user) {
            setFormData({
                full_name: user.full_name || '',
                phone: user.phone || '',
                address: user.address || '', 
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/update-host-info', formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
            });

            if (response.status === 200) {
                // BƯỚC 1: Cập nhật lại dữ liệu mới nhất vào localStorage
                localStorage.setItem('auth_user', JSON.stringify(response.data.user));

                // BƯỚC 2 (QUAN TRỌNG): Phát tín hiệu cho Header biết để cập nhật lại state
                window.dispatchEvent(new Event('authChanged')); 

                // BƯỚC 3: Điều hướng đến trang dashboard
                navigate('/landlord-dashboard');
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin host:", error);
            // Kiểm tra xem có phải lỗi do dữ liệu trùng không
            if (error.response && error.response.data && error.response.data.code === 'ER_DUP_ENTRY') {
                alert('Số điện thoại hoặc Email này đã được sử dụng. Vui lòng kiểm tra lại.');
            } else {
                alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
            }
        }
    };

    return (
        <div className="pt-24 px-4 bg-gray-50 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl flex w-full max-w-4xl overflow-hidden">
                <div className="hidden md:flex w-1/3 bg-blue-50 p-8 flex-col items-center justify-center text-center">
                    <img src={logo} alt="Logo" className="w-24 h-24 mb-4" />
                    <h2 className="text-xl font-bold text-blue-800">Hơn 50.000 Chủ Trọ</h2>
                    <p className="text-gray-600 mt-2">Tin tưởng và sử dụng dịch vụ của Phongtro247</p>
                </div>
                <div className="w-full md:w-2/3 p-8">
                    <h1 className="text-2xl font-bold text-blue-800 mb-6">Thông Tin Host</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full_name">Họ tên</label>
                            <input id="full_name" name="full_name" type="text" value={formData.full_name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Số điện thoại</label>
                            <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">Địa chỉ</label>
                            <input id="address" name="address" type="text" value={formData.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
                        </div>
                        <div>
                            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full">Lưu thông tin</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default HostInfo;