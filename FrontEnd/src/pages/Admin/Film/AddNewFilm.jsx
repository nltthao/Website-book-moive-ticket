import {DatePicker,Form,Input,InputNumber,Switch} from 'antd';
import React, { createContext,useEffect, useState } from 'react'
import {  SwalConfig } from '../../../utils/config';
import { useDispatch } from 'react-redux';

import useRoute from '../../../hooks/useRoute';



export default () => {
    const [movieName, setMovieName] = useState('');
    const [movieDescription, setMovieDescription] = useState('');
    const [movieRelease, setMovieRelease] = useState(null);
    
    const [movieTrailer, setMovieTrailer] = useState('');
    const [moviGenres, setMovieGenres] = useState('');
    const [moviePoster, setMoviePoster] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { navigate } = useRoute()
    const handleSubmit = async (e) => {
       
    const token = localStorage.getItem('token');
    console.log("lllllllllll",moviePoster);
    console.log("qqqqqqqqqq",movieTrailer);
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
     
      const response = await fetch('/admin/addmovie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate(`/admin/film`)
        SwalConfig('Thêm phim thành công', 'success', false)
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
        setMovieRelease(dateString);
        console.log('Selected Date: ', dateString);
      };

      const handleChangeFile = async (e) => {
        // setMoviePoster(e.target.files[0]);
        const file = e.target.files[0];
        setMoviePoster(URL.createObjectURL(file));
        console.log('Selected Date: ', URL.createObjectURL(file));
        }
    return (
        <div className='addFilmAdmin'>
            <h2 className='text-xl uppercase font-bold mb-4'>Thêm Phim Mới</h2>
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
                    {/* <input type="file"  onChange={handleChangeFile}   /> <br />
                    {moviePoster && (
        <img src={moviePoster} alt="Selected Poster" style={{ width: 150, height: 150 }}  accept='image/png image/jpeg image/jpg image/gif'/>
    )} */}                    <Input name='hinhAnh' value={moviePoster}  onChange={(event) => setMoviePoster(event.target.value)} />

                </Form.Item>
                <Form.Item label="Tác vụ">
               
                    <button type='submit'  className='border-2 border-orange-300 px-4 py-2 rounded-md hover:border-orange-500'> Thêm phim</button>
                    {errorMessage && <p className='form-err font-medium mb-4 mt-1'  style={{ color: 'red' }}>{errorMessage}</p>}
                </Form.Item>
            </Form>
        </div>
    );
};
