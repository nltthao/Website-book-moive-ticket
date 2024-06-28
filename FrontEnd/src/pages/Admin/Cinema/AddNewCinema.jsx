import {DatePicker,Form,Input} from 'antd';
import React, {  useState } from 'react'
import {  SwalConfig } from '../../../utils/config';


import useRoute from '../../../hooks/useRoute';



export default () => {
 

  const [cinemaName, setCinemaName] = useState('');
  const [cinemaAddress, setCinemaAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
    const { navigate } = useRoute()
    const handleSubmit = async (e) => {
       
    const token = localStorage.getItem('token');

    // Kết hợp giá trị từ form với movieRelease
    const formData = {
      cinemaName,
      cinemaAddress,

    };

    try {
     
      const response = await fetch('/admin/addcinema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
       
        SwalConfig('Thêm suất chiếu thành công', 'success', false)
        navigate(`/admin/cinema`)
        // history.replace({ pathname: '/admin/film' })
      } else {
        const data = await response.json();
        setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
        console.error('Lỗi khi xác nhận đặt vé:', data.message || 'Có lỗi xảy ra');
        // Xử lý lỗi nếu cần
      }
    } catch (error) {
      setErrorMessage('Vui lòng nhập đầy đủ thông tin!');
      console.error('Error:', error);
    }
  };
  
    
    return (
        <div className='addFilmAdmin'>
            <h2 className='text-xl uppercase font-bold mb-4'>Thêm rạp</h2>
            <Form     onFinish={handleSubmit}
            
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
            >
                 <Form.Item label="Tên rạp">
                        <Input name='tenRạp' value={cinemaName}  onChange={(event) => setCinemaName(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Địa chỉ">
                        <Input name='diaChi' value={cinemaAddress}   onChange={(event) => setCinemaAddress(event.target.value)}/>
                    </Form.Item>
                <Form.Item label="Tác vụ">
               
                    <button type='submit'  className='border-2 border-orange-300 px-4 py-2 rounded-md hover:border-orange-500'> Thêm rạp</button>
                    {errorMessage && <p className='form-err font-medium mb-4 mt-1'  style={{ color: 'red' }}>{errorMessage}</p>}
                </Form.Item>
            </Form>
        </div>
    );
};