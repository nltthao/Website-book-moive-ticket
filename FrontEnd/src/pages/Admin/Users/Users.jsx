import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'

const { Search } = Input;

export default function Users() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { arrayUser } = useSelector(state => state.UserReducer)
    const [data, setData] = useState([])
    const [keyword, setKeyword] = useState('');
   
    const fetchUser = async (searchKeyword) => {
        try {
          const response = await fetch(`/admin/getAllUsers?keyword=${encodeURIComponent(searchKeyword)}`);
          if (!response.ok) {
            throw new Error('Lỗi khi lấy dữ liệu từ server');
          }
          const data = await response.json();
          console.log("lay ra us", data);
          // Kiểm tra dữ liệu có tồn tại và là mảng không
          if (!Array.isArray(data)) {
            throw new Error('Dữ liệu nhận được không phải là một mảng');
          }
    
          // Xử lý dữ liệu thành định dạng mong muốn
          const formattedData = data.map(item => ({
            userId: item.userId,
            taiKhoan: item.username,
                    hoTen: item.userFullname || 'Không có tên',
                     email: item.userEmail || 'Không có mô tả',
                    loaiNguoiDung: item.userRoles?.[0]?.role?.roleName 
          }));
    
          setData(formattedData);
        } catch (error) {
          console.error('Lỗi khi xử lý dữ liệu:', error.message);
          // Xử lý lỗi, có thể hiển thị thông báo cho người dùng
        }
      };
    // useEffect để gọi API lần đầu khi component render và khi keyword thay đổi
  useEffect(() => {
    fetchUser(keyword);
  }, [keyword]); // Chỉ gọi lại khi keyword thay đổi


  const handleSearch = (value) => {
    setKeyword(value); // Cập nhật từ khóa tìm kiếm để trigger useEffect
  };


    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            sorter: (a, b) => {
                let taiKhoanA = a.taiKhoan.toLowerCase().trim();
                let taiKhoanB = b.taiKhoan.toLowerCase().trim();
                if (taiKhoanA > taiKhoanB) {
                    return 1
                }
                return -1
            },
            render: (text, user) => {
                return user.taiKhoan.length > 80 ? user.taiKhoan.slice(0, 80) + '...' : user.taiKhoan
            },
            sortDirections: ['descend'],
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'hoTen',
            sorter: (a, b) => {
                let hoTenA = a.hoTen.toLowerCase().trim();
                let hoTenB = b.hoTen.toLowerCase().trim();
                if (hoTenA > hoTenB) {
                    return 1
                }
                return -1
            },
            render: (text, user) => {
                return user.hoTen.length > 50 ? user.hoTen.slice(0, 50) + '...' : user.hoTen
            },
            sortDirections: ['descend'],
        },

        {
            title: 'Email',
            dataIndex: 'email',
            render: (text, user) => {
                return user.email.length > 80 ? user.email.slice(0, 80) + '...' : user.email
            },

        },
        
        {
            title: 'Loại người dùng',
            dataIndex: 'loaiNguoiDung',
            render: (text, user) => {
                return user.loaiNguoiDung == 'ADMIN' ? 'Quản trị' : 'Khách hàng'
                
            },

        },
        {
            title: 'Hành động',
            dataIndex: 'hanhDong',
            render: (text, user) => {
                return <>
                    <Tooltip placement="leftBottom" title={'Chỉnh sửa'}>
                        <NavLink key={1} className='bg-dark text-blue-600 mr-3 text-2xl ' to={`/admin/user/edit/${user.userId}`}><EditOutlined /></NavLink>
                    </Tooltip>
                    <Tooltip placement="top" title={'Xóa'}>
                        <button onClick={() => {
                            Swal.fire({
                                title: 'Bạn có muốn xóa người này không ?',
                                showDenyButton: true,
                                confirmButtonText: 'Đồng ý',
                                denyButtonText: 'Hủy',
                                icon: 'question',
                                iconColor: 'rgb(104 217 254)',
                                confirmButtonColor: '#f97316'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // Gọi API xóa phim
                                    fetch(`/admin/deleteUser/${user.userId}`, {
                                      method: 'DELETE',
                                      headers: {
                                        'Content-Type': 'application/json',
                                        // Có thể thêm Authorization header nếu cần
                                      }
                                    })
                                      .then(response => {
                                        if (!response.ok) {
                                          throw new Error('Lỗi khi xóa ');
                                        }
                                        // Xử lý thành công, có thể cập nhật lại danh sách phim hoặc hiển thị thông báo
                                        setData(prevUser => prevUser.filter(data => data.user.userId !== user.userId));
  
                                        Swal.fire('Xóa  thành công!', '', 'success');
                                        window.location.reload(true);
                                        // Gọi hàm callback để cập nhật danh sách phim
                                      })
                                      .catch(error => {
                                        console.error('Lỗi khi xóa :', error);
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
        <h2 className='text-2xl uppercase font-bold mb-4'>Quản lý người dùng</h2>

       

        <Search
            className='mb-4'
            placeholder="Tìm kiếm theo tài khoản"
            enterButton='Search'
            size="large"
            value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
            onSearch={handleSearch}
        />

        <Table columns={columns} dataSource={data} rowKey='taiKhoan' />
    </div>;
};
