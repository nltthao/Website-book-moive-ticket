import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import useRoute from '../../hooks/useRoute';
import { kiemTraDinhDang, kiemTraDoDai, kiemTraRong } from '../../utils/validation';
import { SwalConfig } from '../../utils/config';

// import { GROUPID } from '../../utils/constant';
import { history } from '../../utils/history'
export default function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userFullname, setFullname] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userPhone, setPhone] = useState('');
    const [error, setError] = useState('');
    const { navigate } = useRoute();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password,userFullname ,userEmail,userPhone})
            });

            const data = await response.json();
            
            if (response.ok) {
                
                    SwalConfig('Đăng kí thành công', 'success', false)
                    
                    history.replace({ pathname: '/login' })
                   
                console.log('Đăng ký thành công');
               
            } else {
                // Xử lý đăng nhập thất bại và hiển thị thông báo lỗi từ backend
                setError(data.message || 'Đăng nhập không thành công');
            }
        } catch (error) {
            // Xử lý lỗi khi gửi yêu cầu đăng nhập
            console.error('Đã xảy ra lỗi khi đăng nhập:', error.message);
            setError('Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
        }
    };

    

    return (
        <div className='register mt-16'>
            <div className="register__overlay"></div>
            <form onSubmit={handleSubmit} className="form rounded-lg bg-white p-2 sm:px-8 sm:py-4 lg:py-6">
                <div className='text-center mb-4'>
                    <FontAwesomeIcon className='w-10 h-10 text-orange-500' icon={faCircleCheck} />
                    <h2 className='text-xl font-bold'>Đăng Ký</h2>
                </div>
                <div className="form-control">
                    <input  value={username} 
                        onChange={(e) => setUsername(e.target.value)}  placeholder="none" type="text" name="taiKhoan" title='Tài khoản' className="form-input" autoComplete='off' />
                    <label className="form-label bg-white">Tài khoản</label>
                </div>
                <p className='form-err font-medium mb-4 mt-1 '></p>
                <div className="form-control mt-5">
                    <input  value={password} 
                        onChange={(e) => setPassword(e.target.value)}  placeholder="none" type="password" name="matKhau" title='Mật khẩu' className="form-input" autoComplete='off' />
                    <label className="form-label bg-white">Mật khẩu</label>
                </div>
                <p className='form-err font-medium mb-4 mt-1 '></p>
                <div className="form-control mt-5">
                    <input  value={userFullname} 
                        onChange={(e) => setFullname(e.target.value)}  placeholder="none" type="text" name="hoTen" title='Họ tên' className="form-input" autoComplete='off' />
                    <label className="form-label bg-white">Họ tên</label>
                </div>
                <p className='form-err font-medium mb-4 mt-1 '></p>
                <div className="form-control mt-5">
                    <input  value={userEmail} 
                        onChange={(e) => setEmail(e.target.value)}   placeholder="none" type="text" name="email" title='Email' className="form-input" autoComplete='off' />
                    <label className="form-label bg-white">Email</label>
                </div>
                <p className='form-err font-medium mb-4 mt-1 '></p>
                <div className="form-control mt-5">
                    <input  value={userPhone} 
                        onChange={(e) => setPhone(e.target.value)}  placeholder="none" type="text" name="soDt" title='Số diện thoại' className="form-input" autoComplete='off' />
                    <label className="form-label bg-white">Số điện thoại</label>
                </div>
                <p className='form-err font-medium mb-4 mt-1 '></p>
                <div className="my-2 mt-4">
                    <button className="w-full py-4 bg-red-600 text-white font-bold text-sm leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg
                         focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">Đăng Ký
                    </button>
                </div>
                <div className='text-right'>
                    <span onClick={() => navigate('/login')} className='text-black hover:text-black font-medium cursor-pointer'>
                        Bạn đã có tài khoản ? <span className='text-red-600'>Đăng nhập ngay !</span>
                    </span>
                </div>
            </form>
        </div>
    )
}
