import React, { useState } from 'react'
import { Table, Input, Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import axios from 'axios';
const { Search } = Input;

export default function Film() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { arrFilm } = useSelector(state => state.FilmReducer)
    // const [data, setData] = useState([])
      // Dữ liệu cứng
    //   const data = [
    //     {
    //         maPhim: 1,
    //         hinhAnh: 'https://example.com/hinh-phim-1.jpg',
    //         tenPhim: 'Phim 1',
    //         moTa: 'Mô tả phim 1',
    //     },
    //     {
    //         maPhim: 2,
    //         hinhAnh: 'https://example.com/hinh-phim-2.jpg',
    //         tenPhim: 'Phim 2',
    //         moTa: 'Mô tả phim 2',
    //     },
    //     // Thêm dữ liệu cho các phần tử tiếp theo nếu cần
    // ];
    const [getData, setGetData] = useState([]);
    const [keyword, setKeyword] = useState('');
   // Hàm để gọi API khi có từ khóa tìm kiếm mới
  const fetchMovies = async (searchKeyword) => {
    try {
      const response = await fetch(`/admin/getAllMovies?keyword=${encodeURIComponent(searchKeyword)}`);
      if (!response.ok) {
        throw new Error('Lỗi khi lấy dữ liệu từ server');
      }
      const data = await response.json();
      
      // Kiểm tra dữ liệu có tồn tại và là mảng không
      if (!Array.isArray(data)) {
        throw new Error('Dữ liệu nhận được không phải là một mảng');
      }

      // Xử lý dữ liệu thành định dạng mong muốn
      const formattedData = data.map(item => ({
        movieId: item.movieId,
                tenPhim: item.movieName || 'Không có tên',
                 moTa: item.movieDescription || 'Không có mô tả',
                hinhAnh: item.moviePoster || 'Không có hình ảnh'
      }));

      setGetData(formattedData);
    } catch (error) {
      console.error('Lỗi khi xử lý dữ liệu:', error.message);
      // Xử lý lỗi, có thể hiển thị thông báo cho người dùng
    }
  };

  // useEffect để gọi API lần đầu khi component render và khi keyword thay đổi
  useEffect(() => {
    fetchMovies(keyword);
  }, [keyword]); // Chỉ gọi lại khi keyword thay đổi

  // Xử lý sự kiện khi người dùng nhấn nút Search
  const handleSearch = (value) => {
    setKeyword(value); // Cập nhật từ khóa tìm kiếm để trigger useEffect
  };
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    
    //         fetch(`/admin/getAllMovies`, {
    //             method: "GET",
    //             headers: { 'Authorization': `Bearer ${token}` }
    //         }).then(response => {
    //             if (response.status === 200) {
    //                 return response.json();
    //             }
    //             throw new Error("Error from backend");
    //         }).then(data => {
    //             console.log('Dữ liệu nhận được:', data);
    //             if (!Array.isArray(data)) {
    //                 throw new Error('Dữ liệu trả về không phải là một mảng');
    //               }
    //             const formattedData = data.map(item => ({
    //                             movieId: item.movieId,
    //                             tenPhim: item.movieName || 'Không có tên',
    //                             moTa: item.movieDescription || 'Không có mô tả',
    //                             hinhAnh: item.moviePoster || 'Không có hình ảnh'
    //                             // Thêm các trường khác nếu cần
    //                         }));
                           
    //             setGetData(formattedData);
               
    //         }).catch(error => {
    //             console.error('Error nè thao:', error);
    //         });
        
       
    // }, [keyword]);
   

    // const handleSearch = (value) => {
    //     // Xử lý tìm kiếm ở đây
    //     console.log('Từ khóa tìm kiếm:', value);
    //     // Gọi hàm searchKeyword hoặc xử lý tìm kiếm trực tiếp ở đây
    //   };
    // const handleDeleteSuccess = (deletedMovieId) => {
    //     // Xóa phim khỏi danh sách hiện tại
    //     setGetData(prevMovies => prevMovies.filter(getData => getData.movieId !== deletedMovieId));
    //   };
    const columns = [
        {
            title: 'Mã phim',
            dataIndex: 'movieId',
            sorter: (a, b) => a.movieId - b.movieId,
            sortDirections: ['descend'],
            width: 150,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film, index) => {
                return <>
                    <img src={film.hinhAnh} alt={film.hinhAnh} width='50' height='50'
                        onError={(e) => { e.target.onError = null; e.target.src = `https://picsum.photos/id/${index}/50/50` }} />
                </>
            },
            width: 100
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1
                }
                return -1
            },
            render: (text, film) => {
                return film.tenPhim.length > 50 ? film.tenPhim.slice(0, 50) + '...' : film.tenPhim
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            sorter: (a, b) => {
                let moTaA = a.moTa.toLowerCase().trim();
                let moTaB = b.moTa.toLowerCase().trim();
                if (moTaA > moTaB) {
                    return 1
                }
                return -1
            },
            render: (text, film) => {
                return film.moTa.length > 80 ? film.moTa.slice(0, 80) + '...' : film.moTa
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (text, film) => {
                return <>
                    <Tooltip placement="leftBottom" title={'Chỉnh sửa phim'}>
                        <NavLink key={1} className='bg-dark text-blue-600 mr-3 text-2xl ' to={`/admin/film/edit/${film.movieId}`}><EditOutlined  /></NavLink>
                    </Tooltip>
                    <Tooltip placement="bottom" title={'Xóa phim'}>
                        <button onClick={() => {
                          if (!film || !film.movieId) {
                            console.error('Invalid film data:', film);
                            return;
                        }
                    
                            Swal.fire({
                                title: 'Bạn có muốn xóa phim này không ?',
                                showDenyButton: true,
                                confirmButtonText: 'Đồng ý',
                                denyButtonText: 'Hủy',
                                icon: 'question',
                                iconColor: 'rgb(104 217 254)',
                                confirmButtonColor: '#f97316'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                  // Gọi API xóa phim
                                  fetch(`/admin/delete/${film.movieId}`, {
                                    method: 'DELETE',
                                    headers: {
                                      'Content-Type': 'application/json',
                                      // Có thể thêm Authorization header nếu cần
                                    }
                                  })
                                    .then(response => {
                                      if (!response.ok) {
                                        throw new Error('Lỗi khi xóa phim');
                                      }
                                      // Xử lý thành công, có thể cập nhật lại danh sách phim hoặc hiển thị thông báo
                                      // setGetData(prevMovies => prevMovies.filter(getData => getData.film.movieId !== film.movieId));
                                      setGetData(prevMovies => {
                                        if (!prevMovies) return []; // Bảo đảm prevState đã được khởi tạo
                                        return prevMovies.filter(getData => getData.film && getData.film.movieId !== film?.movieId);
                                    });
                                    
                                      Swal.fire('Xóa phim thành công!', '', 'success');
                                      window.location.reload(true);

                                      // Gọi hàm callback để cập nhật danh sách phim
                                    })
                                    .catch(error => {
                                      console.error('Lỗi khi xóa phim:', error);
                                      Swal.fire('Xóa phim thất bại!', 'Vui lòng thử lại sau', 'error');
                                    });
                                } else if (result.isDenied) {
                                  // Người dùng chọn Hủy
                                  Swal.fire('Đã hủy xóa phim', '', 'info');
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
        <h2 className='text-2xl uppercase font-bold mb-4'>Quản lý Phim</h2>

        <Button onClick={() => navigate('/admin/film/addnewfilm')} className='mb-4 font-semibold border-black'>Thêm phim</Button>

        <Search
            className='mb-4'
            placeholder="Tìm kiếm theo tên"
            enterButton='Search'
            size="large"
            value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
            onSearch={handleSearch}
        />

        <Table columns={columns} dataSource={getData} rowKey='maPhim' />
       
    </div>;
};
