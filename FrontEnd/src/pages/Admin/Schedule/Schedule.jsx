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
    const [movies, setMovies] = useState([]);
    const [Room, setRoom] = useState([]);
    const [getData, setGetData] = useState([]);
   

    
      const getMovie = async () => {
      const token = localStorage.getItem('token');
      fetch("/movies", {
          method: "GET",
          headers: {'Authorization': `Bearer ${token}`}
      }).then(response => {
          if (response.status == 200) {
              return response.json();
          }
          throw Error("Error from backend");
      }).then(data => {
        // Giả sử phản hồi có dạng mảng hoặc đối tượng chứa mảng
        const movieData = Array.isArray(data.data) ? data.data : data.data.data;
        console.log("lay duoc dtaa movie", movieData)
        // Trích xuất movieId và movieName
        const extractedMovies = movieData.map(movie => ({
          movieId: movie.movieId,
          movieName: movie.movieName,
        }));
        console.log("aaaaaaaaaa", extractedMovies)
        // Lưu vào state
        setMovies(extractedMovies);
        getRoom(extractedMovies);
          // setMovies(data.data);
        //  console.log("lay duoc data all phim", data.data)
      }).catch(error => {
          console.error('Error fetching cinemas:', error);
      });
  };

//

  const getRoom = async (extractedMovies) => {
  const token = localStorage.getItem('token');
  fetch("/room", {
      method: "GET",
      headers: {'Authorization': `Bearer ${token}`}
  }).then(response => {
      if (response.status == 200) {
          return response.json();
      }
      throw Error("Error from backend");
  }).then(data => {
    // Giả sử phản hồi có dạng mảng hoặc đối tượng chứa mảng
    const roomData = Array.isArray(data.data) ? data.data : data.data.data;
    console.log("lay duoc dtaa movie", roomData)
    // Trích xuất movieId và movieName
    const extractedRoom = roomData.map(room => ({
      roomId: room.roomId,
      roomName: room.roomName,
    }));
    console.log("bbbbbbbbbb", extractedRoom)
    // Lưu vào state
    setRoom(extractedRoom);
    fetchSchedule(extractedRoom,extractedMovies);
      // setMovies(data.data);
    //  console.log("lay duoc data all phim", data.data)
  }).catch(error => {
      console.error('Error fetching cinemas:', error);
  });
};


   // Hàm để gọi API khi có từ khóa tìm kiếm mới
   
  const fetchSchedule = async (extractedRoom,extractedMovies) => {
    try {
      const response = await fetch(`/admin/getAllSchedule`);
      if (!response.ok) {
        throw new Error('Lỗi khi lấy dữ liệu từ server');
      }
      const data = await response.json();
      
      // // Kiểm tra dữ liệu có tồn tại và là mảng không
      if (!Array.isArray(data.data)) {
        throw new Error('Dữ liệu nhận được không phải là một mảng');
      }
      const dataSchedule= data.data;

      const formattedData = dataSchedule.map(item => {
          const foundMovie = extractedMovies.find(movie => movie.movieId === item.movieId);
          const foundRoom = extractedRoom.find(room => room.roomId === item.roomId);
          return {
              scheduleId: item.scheduleId,
              tenPhim: foundMovie ? foundMovie.movieName : 'Không có tên',
              roomName: foundRoom ? foundRoom.roomName : 'Không có tên',
              scheduleDate: item.scheduleDate || '',
              scheduleStart: item.scheduleStart || '',
            };
          });
          console.table(extractedMovies);
          setGetData(formattedData);
    } catch (error) {
      console.error('Lỗi khi xử lý dữ liệu:', error.message);
      // Xử lý lỗi, có thể hiển thị thông báo cho người dùng
    }
  };

  // useEffect để gọi API lần đầu khi component render và khi keyword thay đổi
  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getMovie(), getRoom()]);
      fetchSchedule();
    };
    fetchData();
  }, []); 
   
    const columns = [
        {
            title: 'Mã suất chiếu',
            dataIndex: 'scheduleId',
            sorter: (a, b) => a.scheduleId - b.scheduleId,
            sortDirections: ['descend'],
            width: 150,
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
            title: 'Tên phòng',
            dataIndex: 'roomName',
            sorter: (a, b) => {
                let tenPhongA = a.roomName.toLowerCase().trim();
                let tenPhongB = b.roomName.toLowerCase().trim();
                if (tenPhongA > tenPhongB) {
                    return 1
                }
                return -1
            },
            render: (text, film) => {
                return film.roomName.length > 50 ? film.roomName.slice(0, 50) + '...' : film.roomName
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Ngày chiếu',
            dataIndex: 'scheduleDate',
            sorter: (a, b) => {
                let moTaA = a.scheduleDate.toLowerCase().trim();
                let moTaB = b.scheduleDate.toLowerCase().trim();
                if (moTaA > moTaB) {
                    return 1
                }
                return -1
            },
            render: (text, film) => {
                return film.scheduleDate.length > 80 ? film.scheduleDate.slice(0, 80) + '...' : film.scheduleDate
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Thời gian',
            dataIndex: 'scheduleStart',
            sorter: (a, b) => {
                let thoiGianA = a.scheduleStart.toLowerCase().trim();
                let thoiGianAB = b.scheduleStart.toLowerCase().trim();
                if (thoiGianA > thoiGianAB) {
                    return 1
                }
                return -1
            },
            render: (text, film) => {
                return film.scheduleStart.length > 80 ? film.scheduleStart.slice(0, 80) + '...' : film.scheduleStart
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (text, film) => {
                return <>
                    <Tooltip placement="leftBottom" title={'Chỉnh sửa suất chiếu'}>
                        <NavLink key={1} className='bg-dark text-blue-600 mr-3 text-2xl ' to={`/admin/schedule/edit/${film.scheduleId}`}><EditOutlined  /></NavLink>
                    </Tooltip>
                    <Tooltip placement="bottom" title={'Xóa '}>
                        <button onClick={() => {
                           if (!film || !film.scheduleId) {
                            console.error('Invalid film data:', film);
                            return;
                        }
                            Swal.fire({
                                title: 'Bạn có muốn xóa suất chiếu này không ?',
                                showDenyButton: true,
                                confirmButtonText: 'Đồng ý',
                                denyButtonText: 'Hủy',
                                icon: 'question',
                                iconColor: 'rgb(104 217 254)',
                                confirmButtonColor: '#f97316'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                  // Gọi API xóa phim
                                  fetch(`/admin/deleteSchedule/${film.scheduleId}`, {
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
                                      setGetData(prevMovies => {
                                        if (!prevMovies) return []; // Bảo đảm prevState đã được khởi tạo
                                        return prevMovies.filter(getData => getData.film && getData.film.scheduleId !== film?.scheduleId);
                                      })
                                      Swal.fire('Xóa suất chiếu thành công!', '', 'success');
                                      window.location.reload(false);
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
        <h2 className='text-2xl uppercase font-bold mb-4'>Quản lý suất chiếu</h2>

        <Button onClick={() => navigate('/admin/schedule/addnewschedule')} className='mb-4 font-semibold border-black'>Thêm suất chiếu</Button>

        {/* <Search
            className='mb-4'
            placeholder="Tìm kiếm"
            enterButton='Search'
            size="large"
            value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
            onSearch={handleSearch}
        /> */}

        <Table columns={columns} dataSource={getData} rowKey='scheduleId' />
       
    </div>;
};
