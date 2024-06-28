import {DatePicker,TimePicker,Form,Input,InputNumber,Switch} from 'antd';
import React from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect,useRef } from 'react';
import useRoute from '../../../hooks/useRoute';
import { useParams } from 'react-router-dom';

export default () => {

   
    let { scheduleId } = useParams();

    const [movieId, setMovieId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [ScheduleDate, setScheduleDate] = useState('');
    const [ScheduleStart, setScheduleStart] = useState('');

   
    const { navigate } = useRoute();
    const handleSubmit = async (e) => {
       
        const token = localStorage.getItem('token');
    
        // Kết hợp giá trị từ form với movieRelease
        const formData = {
        
        };
    
        try {
         
          const response = await fetch(`/admin/put/${movieId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            navigate(`/admin/schedule`)
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

      
      const handleDateChange = (date, dateString) => {
        setScheduleDate(dateString);
        console.log('Selected Date: ', dateString);
      };
      const handleTimeChange = (date, dateString) => {
        setScheduleStart(dateString);
        console.log('Selected Date: ', dateString);
      };


     

     
        useEffect(() => {
        
        
        }, [movieId]);
        return (
            <div className='addFilmAdmin'>
                <h2 className='text-xl uppercase font-bold mb-4'>Chỉnh sửa suất chiếu</h2>
                <Form     onFinish={handleSubmit}
                
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                >
                   <Form.Item label="Mã phim">
                        <Input name='maPhim' value={movieId}  onChange={(event) => setMovieId(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Mã Phòng">
                        <Input name='maPhong' value={roomId}  onChange={(event) => setRoomId(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Ngày chiếu">
                        <DatePicker  format={'YYYY/MM/DD'} name='ngayKhoiChieu'  onChange={handleDateChange} />
                    </Form.Item>
                    <Form.Item label="Giờ đi">
                    <TimePicker format={'HH:mm'} name='thoiGian' onChange={handleTimeChange} />
</Form.Item>
                    
                    <Form.Item label="Tác vụ">
                        <button type='submit'  className='border-2 border-orange-300 px-4 py-2 rounded-md hover:border-orange-500'>Cập nhật suất chiếu</button>
                    </Form.Item>
                </Form>
            </div>
        );
};
