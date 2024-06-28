
import React, { useEffect , useState}  from 'react';

import { Form, Input, Button } from 'antd';

import useRoute from '../../../hooks/useRoute';

import { Select } from 'antd';

import { useParams } from 'react-router-dom';
export default () => {

    const [userFullname, setUserFullname] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [roleId, setRoleId] = useState('');
    // const [userRoles, setUserRoles] = useState([]);


    const { navigate } = useRoute();
    let { userId } = useParams();
     // Hàm xử lý khi người dùng nhấn submit
     const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        const formData = {
            userId: userId,
            userFullname: userFullname,
            userEmail: userEmail,
            userPhone: userPhone,
            userRoles: [
                {
                    userRoleId: userId, // Sử dụng userId từ params nếu cần thiết
                    role: {
                        roleId: roleId,
                    },
                },
            ],
        };
        try {
            const response = await fetch(`/admin/putUser/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                navigate(`/admin/user`);
                console.log("gggggggggggg");
            } else {
                const data = await response.json();
                console.error('Lỗi khi cập nhật người dùng:', data.message || 'Có lỗi xảy ra');
                // Xử lý lỗi nếu cần
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Lấy thông tin người dùng từ API hoặc Redux (nếu có)
   


    const roles = [
        { roleId: 1, roleName: 'USER' },
        { roleId: 2, roleName: 'ADMIN' },
    ];
    return (
        <div className='addFilmAdmin'>
            <h2 className='text-xl uppercase font-bold mb-4'>Edit User</h2>
           
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 10 }}
                onFinish={handleSubmit}
            >
                <Form.Item label="Họ tên">
                    <Input
                        value={userFullname}
                        onChange={(e) => setUserFullname(e.target.value)}
                        placeholder="Nhập họ tên người dùng"
                    />
                </Form.Item>
                <Form.Item label="Email">
                    <Input
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Nhập email người dùng"
                    />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="Nhập số điện thoại người dùng"
                    />
                </Form.Item>
                <Form.Item label="Loại người dùng">
                    <Select
                        value={roleId}
                        onChange={(value) => setRoleId(value)}
                        className='border-2 border-gray-500 p-1 rounded-md'
                    >
                        {roles.map(role => (
                            <Select.Option key={role.roleId} value={role.roleId}>
                                {role.roleName}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <Button type='primary' htmlType='submit'>Cập nhật user</Button>
                </Form.Item>
            </Form>
            
        </div>
    );
};
