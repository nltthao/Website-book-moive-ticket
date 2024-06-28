import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import { getLocalStorage, setLocalStorage, SwalConfig } from '../../utils/config';

import axios from 'axios';


import { history } from '../../utils/history';
import useRoute from '../../hooks/useRoute';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate()   ;
     const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
        const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const token=  localStorage.setItem("token", token);
            const response = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            setErrorMessage('Tên người dùng hoặc mật khẩu không đúng. Vui lòng thử lại.');
            if (response.ok) {
                // Xử lý đăng nhập thành công
                const token =  data.data; // Thêm chuỗi "Bearer " vào token JWT
               
                // Lưu token vào localStorage hoặc Redux store để sử dụng trong các yêu cầu sau này
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                const [, payloadBase64] = token.split('.');
            const payload = JSON.parse(atob(payloadBase64));
            console.log("Payload từ token:", payload);
            if (payload.userRoles && Array.isArray(payload.userRoles)) {
                const roles = payload.userRoles;
console.log("oooooooooo",roles);
                if (roles.includes('ADMIN')) {
                    SwalConfig('Đăng nhập thành công', 'success', false)
                    history.replace('/admin');
                } 
                else {
                    SwalConfig('Đăng nhập thành công', 'success', false)
                    history.replace('/');
                }
            } else {
                console.error('Không có thông tin vai trò trong payload:', payload);
                setError('Không có thông tin vai trò. Vui lòng liên hệ quản trị viên.');
            }
        } else {
            setError(data.message || 'Đăng nhập không thành công');
        }
        } catch (error) {
            // // Xử lý lỗi khi gửi yêu cầu đăng nhập
            // console.error('Đã xảy ra lỗi khi đăng nhập:', error.message);
            // setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
            console.error('Đăng nhập thất bại:', error.message);
            setErrorMessage('Tên người dùng hoặc mật khẩu không đúng. Vui lòng thử lại.');
        }
    };

    return (
    
            <div className='login'>
                <div className='login__overlay'></div>
                <form onSubmit={handleSubmit} className="form rounded-lg bg-white p-2 sm:p-4  md:p-8">
                    <div className='text-center mb-6'>
                        <FontAwesomeIcon className='w-10 h-10 text-orange-500' icon={faCircleUser} />
                        <h2 className='text-xl font-bold'>Đăng Nhập</h2>
                    </div>
                    <div className="form-control" >
                        <input placeholder="none" title='Tài khoản' value={username} 
                onChange={(event) => setUsername(event.target.value)} type="text" name="taiKhoan" className="form-input" autoComplete='off' />
                        <label className="form-label bg-white">Tài khoản</label>
                    </div>
                    <p className='form-err font-medium mb-4 mt-1'></p>
                    <div className="form-control mt-6">
                        <input onChange={(event) => setPassword(event.target.value)} value={password}  placeholder="none" title='Mật khẩu'  id='matKhau' type="password" name="password" className="form-input" autoComplete='off' />
                        <label className="form-label bg-white">Mật khẩu</label>
                    </div>
                    {/* Thông báo lỗi */}
            {errorMessage && <p className='form-err font-medium mb-4 mt-1'>{errorMessage}</p>}
                    <div className="my-2 mt-4">
                        <button className="w-full py-4 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg
                         focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out" >Đăng Nhập
                        </button>
                    </div>
                    <div className='text-right'>
                        <span onClick={() => navigate('/register')}  className='text-black hover:text-black font-medium cursor-pointer'>
                            Bạn chưa có tài khoản ? <span className='text-red-600'>Đăng ký ngay !</span>
                        </span>
                    </div>
                </form>
            </div>
        
    )
}
