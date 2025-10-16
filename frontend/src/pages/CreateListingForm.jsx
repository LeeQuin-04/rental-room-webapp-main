// frontend/src/components/CreateListingForm.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { X, UploadCloud } from 'lucide-react';

const CreateListingForm = ({ type, onBack }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        room_count: 1,
        area: '',
        location_id: null,
        street: '',
        address: '',
        price: '',
        amenities: [],
        surroundings: [],
        description: '',
        rules: '',
        listing_type_id: null,
    });

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('auth_user'));
        setCurrentUser(user);

        const fetchListingTypes = async () => {
            try {
                const response = await axios.get('/api/listings/types');
                const currentType = response.data.find(t => t.name === type);
                if (currentType) {
                    setFormData(prev => ({ ...prev, listing_type_id: currentType.id }));
                } else {
                    console.error(`KHÔNG TÌM THẤY ID cho loại tin: "${type}"`);
                }
            } catch (error) {
                console.error("Lỗi khi tải loại tin đăng:", error);
            }
        };
        fetchListingTypes();
    }, [type]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Đảm bảo các giá trị số không phải là chuỗi rỗng
        const finalValue = (name === 'room_count' || name === 'area' || name === 'price') && value === '' ? '' : value;
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const handleCheckboxChange = (field, value) => {
        setFormData(prev => {
            const newValues = prev[field].includes(value)
                ? prev[field].filter(v => v !== value)
                : [...prev[field], value];
            return { ...prev, [field]: newValues };
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 10 - selectedFiles.length);
        if (files.length === 0) return;

        setSelectedFiles(prev => [...prev, ...files]);
        
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...previews]);
        
        e.target.value = null;
    };

    const handleRemoveImage = (indexToRemove) => {
        URL.revokeObjectURL(imagePreviews[indexToRemove]);
        setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
        setImagePreviews(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        
        // [SỬA ĐỔI QUAN TRỌNG] Xử lý và thêm dữ liệu vào FormData
        Object.entries(formData).forEach(([key, value]) => {
            // 1. Bỏ qua các giá trị null hoặc undefined
            if (value === null || value === undefined) {
                return;
            }
            
            // 2. Xử lý các mảng (amenities, surroundings, rules)
            if (Array.isArray(value)) {
                // Chỉ gửi nếu mảng có nội dung
                if (value.length > 0) {
                    data.append(key, JSON.stringify(value));
                }
                return; // Chuyển sang key tiếp theo
            }

            // 3. Xử lý trường 'rules' (nếu nó là chuỗi)
            if (key === 'rules') {
                const processedRules = value.split('\n').map(rule => rule.trim()).filter(Boolean);
                if (processedRules.length > 0) {
                    data.append(key, JSON.stringify(processedRules));
                }
                return; // Chuyển sang key tiếp theo
            }
            
            // 4. Thêm các giá trị khác
            // Đảm bảo không gửi giá trị rỗng cho các trường số bắt buộc
             if ((key === 'area' || key === 'price') && value === '') {
                return;
            }
            data.append(key, value);
        });

        selectedFiles.forEach(file => {
            data.append('images', file);
        });
        
        // [DEBUG] Xem lại FormData trước khi gửi
        console.log("--- Dữ liệu FormData sắp gửi đi ---");
        for (let [key, value] of data.entries()) {
            console.log(key, ':', value);
        }
        console.log("---------------------------------");


        try {
            const response = await axios.post('/api/listings/create', data, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 201) {
                alert('Đăng tin thành công!');
                navigate(`/listing/${response.data.listingId}`);
            }
        } catch (error) {
            console.error("Lỗi khi đăng tin:", error.response || error);
            alert(error.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    // --- JSX không thay đổi ---
    const amenitiesList = [ 'Gác lửng', 'Wifi', 'Vệ sinh trong', 'Phòng tắm', 'Bình nóng lạnh', 'Kệ bếp', 'Máy giặt', 'Tivi', 'Điều hòa', 'Tủ lạnh', 'Giường nệm', 'Tủ áo quần', 'Ban công/ sân thượng', 'Thang máy', 'Bãi để xe riêng', 'Camera an ninh', 'Hồ bơi', 'Sân vườn' ];
    const surroundingsList = [ 'Chợ', 'Siêu thị', 'Bệnh viện', 'Trường học', 'Công viên', 'Bến xe bus', 'Trung tâm thể dục thể thao' ];
    const getTitleByType = () => `Thông tin ${type.toLowerCase()}`;
    return (
        <div className="bg-white shadow rounded-lg p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1976d2]">Tạo tin đăng - {type}</h2>
                <button onClick={onBack} className="text-gray-500 hover:text-[#1976d2] font-medium">← Quay lại</button>
            </div>
            <form className="space-y-8" onSubmit={handleSubmit}>
                 <div>
                    <h3 className="text-lg font-semibold mb-2">{getTitleByType()}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="name" placeholder={`Tên ${type.toLowerCase()}`} className="border p-2 rounded" value={formData.name} onChange={handleInputChange} required />
                        <input type="number" name="room_count" placeholder="Số lượng phòng" className="border p-2 rounded" value={formData.room_count} onChange={handleInputChange} min="1" />
                        <input type="number" name="area" placeholder="Diện tích (m²)" className="border p-2 rounded" value={formData.area} onChange={handleInputChange} required />
                        <input type="number" name="price" placeholder="Giá cho thuê (VND)" className="border p-2 rounded" value={formData.price} onChange={handleInputChange} required />
                        <input type="text" name="street" placeholder="Đường" className="border p-2 rounded" value={formData.street} onChange={handleInputChange} />
                        <input type="text" name="address" placeholder="Địa chỉ chi tiết (Số nhà, ngõ,...)" className="border p-2 rounded col-span-2" value={formData.address} onChange={handleInputChange} required />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Tiện nghi</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {amenitiesList.map((item, idx) => (
                            <label key={idx} className="flex items-center gap-2 text-sm cursor-pointer">
                                <input type="checkbox" checked={formData.amenities.includes(item)} onChange={() => handleCheckboxChange('amenities', item)} className="form-checkbox h-4 w-4 text-blue-600" />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Môi trường xung quanh</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {surroundingsList.map((item, idx) => (
                            <label key={idx} className="flex items-center gap-2 text-sm cursor-pointer">
                                <input type="checkbox" checked={formData.surroundings.includes(item)} onChange={() => handleCheckboxChange('surroundings', item)} className="form-checkbox h-4 w-4 text-blue-600" />
                                {item}
                            </label>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Mô tả chi tiết</h3>
                    <textarea name="description" rows="4" placeholder="Ví dụ: Mô tả lối đi, an ninh, các tiện ích đặc biệt..." className="w-full border p-2 rounded" value={formData.description} onChange={handleInputChange} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Nội quy (Tùy chọn)</h3>
                    <textarea name="rules" rows="3" placeholder="Mỗi nội quy trên một dòng. Ví dụ:&#10;Giờ giấc tự do&#10;Không nuôi thú cưng" className="w-full border p-2 rounded" value={formData.rules} onChange={handleInputChange} />
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Hình ảnh tổng quan (ảnh đầu tiên sẽ là ảnh chính)</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                        <input type="file" id="imageUpload" multiple accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} className="hidden" disabled={selectedFiles.length >= 10} />
                        <label htmlFor="imageUpload" className={`${selectedFiles.length >= 10 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:text-blue-600'} flex flex-col items-center justify-center text-center text-gray-500`}>
                            <UploadCloud size={48} className="mb-2" />
                            <span className="font-medium">Kéo thả hoặc <strong>nhấn để chọn ảnh</strong></span>
                            <span className="text-xs mt-1">Hỗ trợ PNG, JPG, JPEG (còn lại {10 - selectedFiles.length} ảnh)</span>
                        </label>
                        {imagePreviews.length > 0 && (
                            <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} className="relative aspect-square group">
                                        <img src={preview} alt={`preview ${index}`} className="w-full h-full object-cover rounded-md" />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button type="button" onClick={() => handleRemoveImage(index)} className="text-white bg-red-500 rounded-full p-1">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Thông tin liên hệ (sẽ hiển thị trong tin đăng)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input type="text" value={currentUser?.full_name || ''} readOnly className="border p-2 rounded bg-gray-100 cursor-not-allowed" />
                        <input type="text" value={currentUser?.phone || ''} readOnly className="border p-2 rounded bg-gray-100 cursor-not-allowed" />
                        <input type="text" value={currentUser?.phone ? `zalo.me/${currentUser.phone}` : ''} readOnly className="border p-2 rounded bg-gray-100 cursor-not-allowed" />
                    </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <button type="button" onClick={onBack} className="px-6 py-2 bg-gray-200 hover:bg-gray-300 font-medium rounded-md">Hủy</button>
                    <button type="submit" className="px-6 py-2 bg-[#1976d2] hover:bg-blue-700 text-white font-semibold rounded-md">Đăng tin</button>
                </div>
            </form>
        </div>
    );
};

export default CreateListingForm;