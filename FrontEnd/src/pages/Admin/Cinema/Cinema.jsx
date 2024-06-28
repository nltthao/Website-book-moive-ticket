import React, { useState } from 'react'
import { Table, Input, Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import axios from 'axios';
const { Search } = Input;

export default function Schedule() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [Cinemas, setCinemas] = useState([]);
    const [getData, setGetData] = useState([]);
    const [keyword, setKeyword] = useState('');
    

    
      const getCinema = async (searchKeyword) => {
      const token = localStorage.getItem('token');
      fetch(`/admin/getAllCinema?keyword=${encodeURIComponent(searchKeyword)}`, {
          method: "GET",
          headers: {'Authorization': `Bearer ${token}`}
      }).then(response => {
          if (response.status == 200) {
              return response.json();
          }
          throw Error("Error from backend");
      }).then(data => {
       
        setGetData(data);
         console.log("lay duoc data all cinema", data)
      }).catch(error => {
          console.error('Error fetching cinemas:', error);
      });
  }
  
  useEffect(() => {
    getCinema(keyword);
  }, [keyword]);
const handleSearch = (value) => {
    setKeyword(value); // Cập nhật từ khóa tìm kiếm để trigger useEffect
  };
   
    const columns = [
        {
            title: 'Mã rạp',
            dataIndex: 'cinemaId',
            sorter: (a, b) => a.cinemaId - b.cinemaId,
            sortDirections: ['descend'],
            width: 150,
        },
        
        {
            title: 'Tên rạp',
            dataIndex: 'cinemaName',
            sorter: (a, b) => {
                let tenRapA = a.cinemaName.toLowerCase().trim();
                let tenRapB = b.cinemaName.toLowerCase().trim();
                if (tenRapA > tenRapB) {
                    return 1
                }
                return -1
            },
            render: (text, film) => {
                return film.cinemaName.length > 50 ? film.cinemaName.slice(0, 50) + '...' : film.cinemaName
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'cinemaAddress',
            sorter: (a, b) => {
                let diaChiA = a.cinemaAddress.toLowerCase().trim();
                let diaChiB = b.cinemaAddress.toLowerCase().trim();
                if (diaChiA > diaChiB) {
                    return 1
                }
                return -1
            },
            render: (text, film) => {
                return film.cinemaAddress.length > 50 ? film.cinemaAddress.slice(0, 50) + '...' : film.cinemaAddress
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (text, film) => {
                return <>
                    <Tooltip placement="leftBottom" title={'Chỉnh sửa rạp'}>
                        <NavLink key={1} className='bg-dark text-blue-600 mr-3 text-2xl ' to={`/admin/cinema/edit/${film.cinemaId}`}><EditOutlined  /></NavLink>
                    </Tooltip>
                    <Tooltip placement="bottom" title={'Xóa rạp'}>
                        <button onClick={() => {
                            Swal.fire({
                                title: 'Bạn có muốn xóa rạp này không ?',
                                showDenyButton: true,
                                confirmButtonText: 'Đồng ý',
                                denyButtonText: 'Hủy',
                                icon: 'question',
                                iconColor: 'rgb(104 217 254)',
                                confirmButtonColor: '#f97316'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                  // Gọi API xóa phim
                                  fetch(`/admin/deleteCinema/${film.cinemaId}`, {
                                    method: 'DELETE',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      // Có thể thêm Authorization header nếu cần
                                    }
                                  })
                                    .then(response => {
                                      if (!response.ok) {
                                        throw new Error('Lỗi khi xóa rạp');
                                      }
                                      // Xử lý thành công, có thể cập nhật lại danh sách phim hoặc hiển thị thông báo
                                      setGetData(prevMovies => {
                                        if (!prevMovies) return []; // Bảo đảm prevState đã được khởi tạo
                                        return prevMovies.filter(getData => getData.film && getData.film.cinemaId !== film?.cinemaId);
                                      })
                                      Swal.fire('Xóa suất chiếu thành công!', '', 'success');
                                      // Gọi hàm callback để cập nhật danh sách phim
                                    })
                                    .catch(error => {
                                      console.error('Lỗi khi xóa:', error);
                                      Swal.fire('Xóa thất bại!', 'Vui lòng thử lại sau', 'error');
                                    });
                                } else if (result.isDenied) {
                                  // Người dùng chọn Hủy
                                  Swal.fire('Đã hủy xóa ', '', 'info');
                                }
                              });
                        }} key={2} className='bg-dark text-red-600 text-2xl hover:text-red-400'><DeleteOutlined /></button>
                    </Tooltip>
                    
                </>
            },
            width: 150
        },
    ];
    return <div className='adminFilm'>
        <h2 className='text-2xl uppercase font-bold mb-4'>Quản lý rạp</h2>

        <Button onClick={() => navigate('/admin/cinema/addnewscinema')} className='mb-4 font-semibold border-black'>Thêm rạp</Button>

        <Search
            className='mb-4'
            placeholder="Tìm kiếm theo tên"
            enterButton='Search'
            size="large"
            value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
            onSearch={handleSearch}
        />

        <Table columns={columns} dataSource={getData} rowKey='cinemaId' />
       
    </div>;
};
