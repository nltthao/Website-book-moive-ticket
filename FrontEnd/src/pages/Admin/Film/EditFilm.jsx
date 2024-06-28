import {DatePicker,Form,Input,InputNumber,Switch} from 'antd';
import React from 'react';

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect,useRef } from 'react';
import useRoute from '../../../hooks/useRoute';
import { useParams } from 'react-router-dom';

export default () => {

   
    let { movieId } = useParams();

    const [movieName, setMovieName] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [movieRelease, setMovieRelease] = useState(null);
    
    const [movieTrailer, setMovieTrailer] = useState('');
    const [moviGenres, setMovieGenres] = useState('');
    const [moviePoster, setMoviePoster] = useState('');
    const fileInputRef = useRef(null);
    const { navigate } = useRoute();
    const handleSubmit = async (e) => {
       
        const token = localStorage.getItem('token');
    
        // Kết hợp giá trị từ form với movieRelease
        const formData = {
          movieName,
          movieDescription,
          movieRelease,
          movieTrailer ,
          moviGenres,
          moviePoster
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

      
      const handleDateChange = (date, dateString) => {
        setMovieRelease(dateString);
        console.log('Selected Date: ', dateString);
      };

      const handleChangeFile = async (e) => {
        const file = fileInputRef.current.files[0];
        setMoviePoster(file)

        };
        useEffect(() => {
        
        
        }, [movieId]);
        return (
            <div className='addFilmAdmin'>
                <h2 className='text-xl uppercase font-bold mb-4'>Cập nhật phim</h2>
                <Form     onFinish={handleSubmit}
                
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                >
                    <Form.Item label="Tên phim">
                        <Input name='tenPhim' value={movieName}  onChange={(event) => setMovieName(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Trailer">
                        <Input name='trailer' value={movieTrailer}   onChange={(event) => setMovieTrailer(event.target.value)}/>
                    </Form.Item>
                    <Form.Item label="Mô tả">
                        <Input name='moTa' value={movieDescription}  onChange={(event) => setMovieDescription(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Thể loại">
                        <Input name='theLoai' value={moviGenres}  onChange={(event) => setMovieGenres(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Ngày khởi chiếu">
                        <DatePicker  format={'YYYY/MM/DD'} name='ngayKhoiChieu'  onChange={handleDateChange} />
                    </Form.Item>
                
                    <Form.Item label="Hình ảnh">
                        {/* <input type="file" ref={fileInputRef} onChange={handleChangeFile}   accept=".jpg,.png,.jpeg"   /> <br />
                        {moviePoster && (
            <img src={URL.createObjectURL(moviePoster)} alt="Selected Poster" style={{ width: 150, height: 150 }}  accept='image/png image/jpeg image/jpg image/gif'/>
        )} */} <Input name='hinhAnh' value={moviePoster}  onChange={(event) => setMoviePoster(event.target.value)} />
                    </Form.Item>
                    <Form.Item label="Tác vụ">
                        <button type='submit'  className='border-2 border-orange-300 px-4 py-2 rounded-md hover:border-orange-500'>Cập nhật phim</button>
                    </Form.Item>
                </Form>
            </div>
        );
};
