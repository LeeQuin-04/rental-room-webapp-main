import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logo } from '../assets/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AuthModel = ({ type, onClick }) => {
    const [currentView, setCurrentView] = useState(type);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '', // Sẽ là email hoặc phone
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentView(type);
        setFormData({ fullName: '', username: '', password: '', confirmPassword: '' });
        setError('');
    }, [type]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async () => {
        if (!formData.username || !formData.password) {
            return setError('Vui lòng nhập đầy đủ thông tin!');
        }
        setLoading(true);
        try {
            const res = await axios.post(`/api/auth/login`, {
                emailOrPhone: formData.username,
                password: formData.password,
            });
            localStorage.setItem('auth_token', res.data.token);
            localStorage.setItem('auth_user', JSON.stringify(res.data.user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            window.dispatchEvent(new Event('authChanged'));
            onClick(null);
            navigate(0);
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập thất bại!');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        const { fullName, username, password, confirmPassword } = formData;
        if (!fullName || !username || !password || !confirmPassword) {
            return setError('Vui lòng điền đầy đủ thông tin.');
        }
        if (password !== confirmPassword) {
            return setError('Mật khẩu xác nhận không khớp!');
        }
        setLoading(true);
        try {
            // [SỬA LỖI] Gửi dữ liệu đi một cách rõ ràng
            const dataToSend = {
                full_name: fullName,
                email: username.includes('@') ? username : '',
                phone: !username.includes('@') ? username : '',
                password,
            };

            await axios.post(`/api/auth/register`, dataToSend);
            
            alert('Đăng ký thành công! Vui lòng chuyển sang tab đăng nhập.');
            setCurrentView('Login');
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký thất bại!');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (currentView === 'Login') {
            handleLogin();
        } else {
            handleRegister();
        }
    };

    const requestClose = e => {
        if (e) e.stopPropagation();
        onClick(null);
    };

    return (
        <AnimatePresence mode="wait">
            {currentView && (
                <motion.div
                    key={currentView}
                    className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center"
                    onClick={requestClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="p-5 py-11 w-full h-full sm:w-[450px] sm:h-auto bg-white sm:rounded-lg relative"
                        onClick={e => e.stopPropagation()}
                        initial={{ translateY: '150%' }}
                        animate={{ translateY: 0 }}
                        exit={{ translateY: '150%' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="absolute top-2 right-2 cursor-pointer w-8 h-8 flex items-center justify-center z-[99]" onClick={requestClose}>
                            <FontAwesomeIcon icon={faTimes} className="text-[20px]" />
                        </div>

                        {currentView === 'Login' && (
                            <div className="w-[60px] h-[60px] flex items-center mx-auto">
                                <img src={logo} alt="logo" />
                            </div>
                        )}

                        <p className={`${currentView === 'Login' ? 'text-center font-semibold text-[#2e2a2a] text-[18px] capitalize mt-2' : 'font-semibold text-[#2e2a2a] text-[18px] capitalize'}`}>
                            {currentView === 'Login' ? 'Chào mừng bạn đến với Phongtro247' : 'Đăng ký tài khoản mới'}
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mt-6 flex flex-col gap-y-4 text-[#2e2a2a]">
                                {currentView === 'Register' && (
                                    <div>
                                        <label htmlFor="fullName" className="text-sm font-[400] mb-2 block">Họ và Tên</label>
                                        <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} className="border block w-full border-gray-300 outline-0 hover:border-[#00b7ff] focus:border-[#00b7ff] transition-colors duration-300 rounded-md px-3 py-2 text-sm" placeholder="Nhập vào Họ và Tên" required />
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="username" className="text-sm font-[400] mb-2 block">Email / Số điện thoại</label>
                                    <input id="username" name="username" type="text" value={formData.username} onChange={handleInputChange} className="border block w-full border-gray-300 outline-0 hover:border-[#00b7ff] focus:border-[#00b7ff] transition-colors duration-300 rounded-md px-3 py-2 text-sm" placeholder="Nhập vào Email hoặc Số điện thoại" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="text-sm font-[400] mb-2 block">Mật khẩu</label>
                                    <input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} className="border block w-full border-gray-300 outline-0 hover:border-[#00b7ff] focus:border-[#00b7ff] transition-colors duration-300 rounded-md px-3 py-2 text-sm" placeholder="Nhập vào mật khẩu" required />
                                </div>
                                {currentView === 'Register' && (
                                    <div>
                                        <label htmlFor="confirmPassword" className="text-sm font-[400] mb-2 block">Xác nhận mật khẩu</label>
                                        <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} className="border block w-full border-gray-300 outline-0 hover:border-[#00b7ff] focus:border-[#00b7ff] transition-colors duration-300 rounded-md px-3 py-2 text-sm" placeholder="Nhập lại mật khẩu" required />
                                    </div>
                                )}
                                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                                {currentView === 'Login' && (
                                    <div className="text-[#0045a8] text-[12px] font-[300] flex items-center justify-between">
                                        <button type="button" className="cursor-pointer hover:underline underline-offset-2">Quên mật khẩu?</button>
                                        <button type="button" onClick={() => setCurrentView('Register')} className="cursor-pointer hover:underline underline-offset-2">Đăng ký</button>
                                    </div>
                                )}
                                <button type="submit" disabled={loading} className="w-full p-[15px] font-[500] bg-[#ff5c00] cursor-pointer flex items-center justify-center hover:opacity-80 transition-opacity duration-300 text-white text-sm rounded-lg h-[46px] disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {loading ? 'Đang xử lý...' : (currentView === 'Login' ? 'Đăng nhập' : 'Đăng ký')}
                                </button>
                                {currentView === 'Register' && (
                                    <p className="text-[12px] text-center">Đã có tài khoản? <button type="button" onClick={() => setCurrentView('Login')} className="text-blue-600 font-semibold">Đăng nhập</button></p>
                                )}
                            </div>
                        </form>
                        
                        <div className="mt-6">
                            <div className="flex items-center gap-x-[2px]">
                                <span className="h-[1px] bg-[#ebecec] flex-1 rounded-full"></span>
                                <span className="flex-1 text-[12px] text-[#8f9098] text-center whitespace-nowrap">Hoặc đăng nhập bằng</span>
                                <span className="h-[1px] bg-[#ebecec] flex-1"></span>
                            </div>
                            <div className="mt-6 flex items-center justify-center gap-x-2">
                                {/* ... Các nút đăng nhập bằng Mạng xã hội ... */}
                            <div className="p-[6px] w-8 h-8 bg-[#ed3241] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-300">
                                    {/* Google */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <mask
                                            id="mask0_208_1311"
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="0"
                                            width="12"
                                            height="12"
                                        >
                                            <path
                                                d="M11.2835 4.96861C11.3522 5.3368 11.3897 5.72176 11.3897 6.12348C11.3897 9.2657 9.28665 11.5 6.11035 11.5C5.38802 11.5002 4.67272 11.3581 4.00533 11.0818C3.33794 10.8055 2.73154 10.4003 2.22077 9.88958C1.71001 9.37881 1.30489 8.77241 1.02857 8.10502C0.752243 7.43763 0.610132 6.72233 0.610352 6C0.610132 5.27767 0.752243 4.56237 1.02857 3.89498C1.30489 3.22759 1.71001 2.62119 2.22077 2.11042C2.73154 1.59966 3.33794 1.19454 4.00533 0.918214C4.67272 0.641891 5.38802 0.49978 6.11035 0.5C7.59542 0.5 8.83633 1.04642 9.78838 1.93367L8.23794 3.4841V3.48019C7.66079 2.93041 6.92831 2.64826 6.11035 2.64826C4.29564 2.64826 2.82063 4.18138 2.82063 5.99665C2.82063 7.81136 4.29564 9.34783 6.11035 9.34783C7.75689 9.34783 8.87767 8.40639 9.10786 7.11352H6.11035V4.96861H11.2841H11.2835Z"
                                                fill="white"
                                            ></path>
                                        </mask>
                                        <g mask="url(#mask0_208_1311)">
                                            <rect
                                                x="0.000976562"
                                                width="12"
                                                height="12"
                                                fill="white"
                                            ></rect>
                                        </g>
                                    </svg>
                                </div>

                                <div className="p-[6px] w-8 h-8 bg-[#006ffd] rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-300">
                                    {/* Facebook */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                    >
                                        <mask
                                            id="mask0_208_1337"
                                            maskUnits="userSpaceOnUse"
                                            x="3"
                                            y="0"
                                            width="6"
                                            height="12"
                                        >
                                            <path
                                                d="M4.57263 12V6.36925H3.08374V4.34191H4.57263V2.6103C4.57263 1.24958 5.45212 0 7.47866 0C8.29917 0 8.9059 0.07866 8.9059 0.07866L8.85809 1.97185C8.85809 1.97185 8.23932 1.96583 7.5641 1.96583C6.8333 1.96583 6.71621 2.30261 6.71621 2.86158V4.34191H8.91618L8.82046 6.36925H6.71621V12H4.57263Z"
                                                fill="white"
                                            ></path>
                                        </mask>
                                        <g mask="url(#mask0_208_1337)">
                                            <rect
                                                x="0.000976562"
                                                width="12"
                                                height="12"
                                                fill="white"
                                            ></rect>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AuthModel;