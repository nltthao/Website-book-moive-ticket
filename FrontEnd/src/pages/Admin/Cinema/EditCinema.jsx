import {DatePicker,Form,Input,InputNumber,Switch} from 'antd';
import React from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect,useRef } from 'react';
import useRoute from '../../../hooks/useRoute';
import { useParams } from 'react-router-dom';

export default () => {

   
    let { cinemaId } = useParams();

    const [cinemaName, setCinemaName] = useState('');
    const [cinemaAddress, setCinemaAddress] = useState('');
    
    const { navigate } = useRoute();
    const handleSubmit = async (e) => {
       
        const token = localStorage.getItem('token');
    
        // Kết hợp giá trị từ form với movieRelease
        const formData = {
          
        };
    
        try {
         
          const response = await fetch(`/admin/put/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            navigate(`/admin/film`)
            // history.replace({ pathname: '/admin/film' })
          } else {
            const data = await response.json();
            console.error('Lỗi khi xác nhận đặt vé:', data.message || 'Có lỗi xảy ra');
            // Xử lý lỗi nếu cần
          }
        } catch (error) {
         
          console.error('Error:', error);
        }
      };

      
    

        return (
            <div className='addFilmAdmin'>
                <h2 className='text-xl uppercase font-bold mb-4'>Cập nhật rạp</h2>
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
                        <button type='submit'  className='border-2 border-orange-300 px-4 py-2 rounded-md hover:border-orange-500'>Cập nhật rạp</button>
                    </Form.Item>
                </Form>
            </div>
        );
};
