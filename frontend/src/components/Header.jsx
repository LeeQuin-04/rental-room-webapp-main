import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef } from 'react';
import { logo } from '../assets/assets';
import AuthModel from './AuthModel';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [toggleSideBar, setToggleSideBar] = useState(false);
    const [authModel, setAuthModel] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);

    const toggleAuthForm = type => {
        setAuthModel(type);
    };

    useEffect(() => {
        const loadUser = () => {
            const raw = localStorage.getItem('auth_user');
            try {
                const user = raw ? JSON.parse(raw) : null;
                setCurrentUser(user);
            } catch {
                setCurrentUser(null);
            }
        };
        loadUser();
        window.addEventListener('authChanged', loadUser);
        return () => window.removeEventListener('authChanged', loadUser);
    }, []);

    useEffect(() => {
        if (authModel) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => (document.body.style.overflow = 'auto');
    }, [authModel]);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userMenuRef]);

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        delete axios.defaults.headers.common['Authorization'];
        window.dispatchEvent(new Event('authChanged'));
        setIsUserMenuOpen(false);
        navigate('/');
    };

    const handlePostListingClick = () => {
        if (currentUser) {
            if (currentUser.has_completed_host_info === 1) {
                navigate('/landlord-dashboard');
            } else {
                navigate('/host-info');
            }
        } else {
            toggleAuthForm('Login');
        }
    };

    const userInitials = currentUser?.full_name
        ? currentUser.full_name.trim().split(/\s+/).slice(0, 2).map(s => s[0]?.toUpperCase()).join('')
        : 'U';

    return (
        <div className="2xl:px-48 xl:px-32 md:px-10 px-[10px] fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
            <div className="flex items-center justify-between h-[80px]">
                
                <div className="flex items-center gap-x-8">
                    <div className="flex items-center gap-x-2">
                        <div className="lg:hidden w-10 h-10 flex items-center cursor-pointer" onClick={() => setToggleSideBar(true)}><FontAwesomeIcon icon={faBars} className="text-gray-600 text-2xl" /></div>
                        <div className={`fixed inset-0 bg-black/60 z-50 transition-all duration-300 ease-in-out ${toggleSideBar ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setToggleSideBar(false)}>
                            <div className={`absolute top-0 bottom-0 left-0 w-[300px] bg-white z-51 transform transition-transform duration-300 ease-in-out ${toggleSideBar ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
                                <div className="h-[55px] w-full bg-blue-600 px-4 py-2 flex items-center"><div className="w-10 h-10 cursor-pointer flex items-center justify-center bg-white/15 rounded-md" onClick={() => setToggleSideBar(false)}><FontAwesomeIcon icon={faXmark} className="text-white text-lg" /></div></div>
                                <ul>
                                    <li className="p-4 text-gray-700 text-sm border-b border-gray-200 cursor-pointer">Nhà trọ, phòng trọ</li>
                                    <li className="p-4 text-gray-700 text-sm border-b border-gray-200 cursor-pointer">Nhà nguyên căn</li>
                                    <li className="p-4 text-gray-700 text-sm border-b border-gray-200 cursor-pointer">Căn hộ</li>
                                    <li className="p-4 text-gray-700 text-sm border-b border-gray-200 cursor-pointer">Video Review</li>
                                    <li className="p-4 text-gray-700 text-sm border-b border-gray-200 cursor-pointer">Liên hệ</li>
                                </ul>
                            </div>
                        </div>
                        <Link to="/" className="flex items-center gap-x-2 cursor-pointer">
                            <div className="w-12 h-12 flex-shrink-0 flex items-center"><img src={logo} alt="Logo" /></div>
                            <h3 className="text-blue-700 font-bold text-lg uppercase hidden sm:block">PHONGTRO247</h3>
                        </Link>
                    </div>

                    <div>
                        <ul className="lg:flex text-gray-800 items-center font-medium text-base lg:text-[15px] 2xl:gap-x-4 gap-x-3 hidden">
                            <NavLink to="/rental-rooms" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'} transition-colors`}>Nhà trọ, phòng trọ</NavLink>
                            <NavLink to="/whole-houses" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'} transition-colors`}>Nhà nguyên căn</NavLink>
                            <NavLink to="/apartments" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'} transition-colors`}>Căn hộ</NavLink>
                            <NavLink to="/videos" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'} transition-colors`}>Video Review</NavLink>
                            <NavLink to="/contact" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'text-blue-600 font-semibold' : 'hover:text-blue-600'} transition-colors`}>Liên hệ</NavLink>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center gap-x-4">
                    <button className="flex items-center gap-x-2 cursor-pointer px-4 py-2 rounded-md border border-gray-200 group hover:bg-green-50 transition-all duration-150">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 512 512"><g><path d="M305.376,217.024c10.275,13.376,8.235,32.626-3.614,44.605l-32.5,32.855c-7.318,7.398-19.204,7.398-26.522,0l-32.5-32.855   c-11.85-11.979-13.889-31.229-3.614-44.605c12.415-16.161,35.529-17.243,49.375-3.245   C269.847,199.782,292.961,200.863,305.376,217.024z M407.405,111.248l-19.953,20.461c-1.02,1.048-2.188,1.874-3.414,2.594v305.734   c0,22.055-17.945,40-40,40h-176c-22.055,0-40-17.945-40-40v-21.692c-1.257-0.729-2.456-1.57-3.5-2.644l-19.945-20.453   c-10.133-10.398-11.266-26.375-2.625-37.18c4.813-6.008,11.914-9.672,19.484-10.039c2.223-0.123,4.43,0.105,6.586,0.553V72.037   c0-22.055,17.945-40,40-40h176c19.542,0,35.793,14.108,39.258,32.662c2.343-0.548,4.771-0.796,7.25-0.669   c7.57,0.367,14.672,4.031,19.484,10.039c0,0,0,0,0.008,0C418.67,84.866,417.545,100.85,407.405,111.248z M224.037,440h64   c8.837,0,16-7.164,16-16s-7.163-16-16-16h-64c-8.836,0-16,7.164-16,16S215.201,440,224.037,440z M368.037,376V134.345   c-1.257-0.729-2.456-1.57-3.5-2.644l-19.945-20.453c-6.283-6.447-9.088-15.038-8.267-23.211H144.037v260.528   c2.114-0.432,4.284-0.656,6.508-0.536c7.57,0.367,14.672,4.031,19.484,10.039c0,0,0,0,0.008,0   c4.141,5.179,5.977,11.554,5.709,17.931H368.037z M135.998,404.537l19.953-20.461c4.438-4.547,5.133-11.578,1.586-16.008   c-1.977-2.469-4.734-3.906-7.773-4.055c-2.991-0.147-5.826,0.98-7.983,3.156c-1.455,1.512-3.478,2.469-5.744,2.469   c-0.014,0-0.025-0.008-0.039-0.008l0,0c-0.027,0-0.052-0.016-0.079-0.016c-1.062-0.017-2.08-0.217-3.002-0.608   c-0.624-0.26-1.134-0.719-1.676-1.129c-0.279-0.215-0.622-0.344-0.87-0.593c-0.029-0.029-0.071-0.038-0.099-0.067   c-2.039-2.086-4.688-3.219-7.516-3.219c-0.172,0-0.344,0.008-0.523,0.016c-3.031,0.148-5.797,1.586-7.773,4.055   c-3.539,4.43-2.844,11.461,1.586,16.008L135.998,404.537z M397.537,84.069c-1.977-2.469-4.734-3.906-7.773-4.055   c-2.976-0.116-5.826,0.981-7.983,3.157c-1.455,1.511-3.478,2.468-5.744,2.468c-0.014,0-0.025-0.008-0.039-0.008l0,0   c-0.027,0-0.052-0.016-0.079-0.016c-1.062-0.017-2.08-0.217-3.002-0.608   c-0.624-0.26-1.134-0.719-1.676-1.129   c-0.279-0.215-0.622-0.344-0.87-0.593c-0.029-0.029-0.071-0.038-0.099-0.067   c-2.039-2.086-4.688-3.219-7.516-3.219   c-0.172,0-0.344,0.008-0.523,0.016c-3.031,0.148-5.797,1.586-7.773,4.055   c-3.539,4.43-2.844,11.461,1.586,16.008l19.953,20.461   l19.953-20.461C400.389,95.53,401.084,88.498,397.537,84.069z"/></g></svg>
                        <span className="text-green-600 whitespace-nowrap text-sm font-medium">Ứng dụng</span>
                    </button>
                    
                    <button onClick={handlePostListingClick} className="flex items-center gap-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path fillRule="evenodd" clipRule="evenodd" d="M19.4423 2.60315C19.7838 2.77155 20 3.11926 20 3.50001V7.46482L20.8906 8.05856C22.2084 8.93711 23 10.4162 23 12C23 13.5838 22.2084 15.0629 20.8906 15.9415L20 16.5352V19.5C20 19.8774 19.7876 20.2226 19.4507 20.3927C19.1139 20.5627 18.7101 20.5287 18.4064 20.3048C18.4064 20.3048 18.4064 20.3048 18.4064 20.3048C18.4064 20.3048 18.4064 20.3047 18.4063 20.3047L18.4063 20.3047L18.4054 20.3041L18.4012 20.301L18.3831 20.2876L18.3098 20.2344C18.2453 20.1876 18.1506 20.1194 18.0313 20.0349C17.7926 19.8657 17.4571 19.6319 17.0712 19.3747C16.2873 18.8523 15.3391 18.2625 14.5765 17.9059C13.1878 17.2566 11.7408 16.7733 10.6322 16.4513C10.1547 16.3125 9.74373 16.2048 9.43209 16.1275C8.63487 17.4199 8.92926 19.1226 10.1451 20.0682C11.3765 21.026 10.6993 23 9.13919 23H6C5.59997 23 5.23843 22.7616 5.08085 22.3939L4.69925 21.5035C3.87957 19.5909 3.83735 17.4342 4.58156 15.491L4.62696 15.3725C2.51738 14.8594 1 12.9633 1 10.7539C1 8.12839 3.12838 6.00001 5.75387 6.00001H9C9.02628 6.00001 9.05256 6.00104 9.07876 6.00311C9.07943 6.00317 9.07959 6.00318 9.07974 6.00319L9.08164 6.00333L9.10038 6.00461C9.1185 6.00579 9.14773 6.00754 9.18726 6.00945C9.26636 6.01329 9.38647 6.01774 9.54125 6.01952C9.85127 6.02309 10.2977 6.01586 10.8305 5.97193C11.9038 5.8834 13.2878 5.64894 14.6043 5.08164C15.3591 4.75639 16.2945 4.1762 17.0738 3.64858C18.023 2.98068 18.2339 2.82527 18.2972 2.77773L18.369 2.72362L18.3866 2.71022L18.3913 2.70655C18.6934 2.47485 19.1009 2.43476 19.4423 2.60315ZM8 8.00001H5.75387C4.23295 8.00001 3 9.23295 3 10.7539C3 12.1213 4.00336 13.2816 5.35646 13.4789L6.14107 13.5933L8 13.8515V8.00001ZM10 14.2079C10.3214 14.2886 10.7267 14.396 11.1901 14.5306C12.3557 14.8692 13.9087 15.3859 15.4235 16.0941C16.2629 16.4866 17.2274 17.082 18 17.5909V16V8.00001V5.43572C17.2289 5.9496 16.2582 6.54673 15.3957 6.91837C13.8127 7.6005 12.1967 7.86604 10.9949 7.96516C10.6233 7.9958 10.2876 8.01083 10 8.0169V14.2079ZM7.36806 15.7829L6.64962 15.6832L6.44927 16.2063C5.89112 17.6637 5.92278 19.2812 6.53754 20.7157L6.6594 21H8.22938C6.9697 19.5684 6.63958 17.5343 7.36806 15.7829ZM20 14.1152C20.6294 13.5985 21 12.8238 21 12C21 11.1762 20.6294 10.4015 20 9.88478V14.1152Z" fill="currentColor"></path></svg>
                        <span className="text-sm font-medium whitespace-nowrap">Đăng tin Trọ</span>
                    </button>
                    
                    {!currentUser ? (
                        <div className="flex items-center gap-x-2">
                            <button onClick={() => toggleAuthForm('Login')} className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md">Đăng nhập</button>
                            <button onClick={() => toggleAuthForm('Register')} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Đăng ký</button>
                        </div>
                    ) : (
                        <div className="relative" ref={userMenuRef}>
                            <div className="flex items-center gap-x-4">
                                <button className="p-2.5 rounded-full relative bg-gray-100 hover:bg-gray-200 text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"></path></svg><div className="absolute top-0 right-0 w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">0</div></button>
                                <button className="p-2.5 rounded-full relative bg-gray-100 hover:bg-gray-200 text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"></path></svg><div className="absolute top-0 right-0 w-4 h-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">1</div></button>
                                <button onClick={() => setIsUserMenuOpen(prev => !prev)} className="w-10 h-10 relative rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">{userInitials}</button>
                            </div>
                            {isUserMenuOpen && (
                                <div className="absolute w-[280px] h-auto right-0 mt-4 p-2 shadow-lg bg-white border border-gray-200 rounded-md">
                                    <div className="flex items-center gap-x-3 p-2 mb-2 border-b border-b-gray-100"><div className="w-10 h-10 flex-shrink-0 relative cursor-pointer rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">{userInitials}</div><div><p className="font-semibold text-sm capitalize text-gray-800">{currentUser.full_name}</p><p className="text-gray-500 text-xs">ID: #{currentUser.id}</p></div></div>
                                    <div className="py-1 border-b border-b-gray-100">
                                        <div className="flex items-center gap-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg><span className="text-sm">Thông tin lưu trú</span></div>
                                        <div className="flex items-center gap-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"></path></svg><span className="text-sm">Thông tin cá nhân</span></div>
                                        <div className="flex items-center gap-x-3 p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"></path></svg><span className="text-sm">Thông tin tài khoản</span></div>
                                    </div>
                                    <div className="pt-1" onClick={handleLogout}>
                                        <div className="flex items-center gap-x-3 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"></path></svg><span className="text-sm font-medium">Đăng xuất</span></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {authModel && <AuthModel type={authModel} onClick={toggleAuthForm} />}
        </div>
    );
};

export default Header;