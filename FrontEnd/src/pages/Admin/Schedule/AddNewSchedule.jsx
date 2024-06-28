import {DatePicker,TimePicker, Form,Input,InputNumber,Switch} from 'antd';
import React, { createContext,useEffect, useState } from 'react'
import {  SwalConfig } from '../../../utils/config';
import { useDispatch } from 'react-redux';

import useRoute from '../../../hooks/useRoute';



export default () => {
  const [movieId, setMovieId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [scheduleDate, setScheduleDate] = useState(null);
  const [scheduleStart, setScheduleStart] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
    const { navigate } = useRoute()
    const handleSubmit = async (e) => {
       
    const token = localStorage.getItem('token');

    // Kết hợp giá trị từ form với movieRelease
    const formData = {
      movieId,
      roomId,
      scheduleDate,
      scheduleStart
    };

    try {
     
      const response = await fetch('/admin/addschedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        SwalConfig('Thêm suất chiếu thành công', 'success', false)
        navigate(`/admin/schedule`)
      
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
  
  const handleDateChange = (date, dateString) => {
    setScheduleDate(dateString);
    console.log('ppppppppppp ', dateString);
  };
  const handleTimeChange = (date, dateString) => {
    setScheduleStart(dateString);
    console.log('dddddddđ: ', dateString);
  };

    return (
        <div className='addFilmAdmin'>
            <h2 className='text-xl uppercase font-bold mb-4'>Thêm suất chiếu</h2>
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
               
                    <button type='submit'  className='border-2 border-orange-300 px-4 py-2 rounded-md hover:border-orange-500'> Thêm suất chiếu</button>
                    {errorMessage && <p className='form-err font-medium mb-4 mt-1'  style={{ color: 'red' }}>{errorMessage}</p>}
                </Form.Item>
            </Form>
        </div>
    );
};
