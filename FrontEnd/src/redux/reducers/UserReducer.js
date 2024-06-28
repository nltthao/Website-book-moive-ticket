import { createSlice } from '@reduxjs/toolkit'


const thongTinTaiKhoan = {
    accessToken: '',
    email: '',
    hoTen: '',
    maLoaiNguoiDung: '',
    maNhom: '',
    soDT: '',
    taiKhoan: ''
}

const initialState = {
    isLogin: false,
    thongTinNguoiDung: thongTinTaiKhoan,
    arrayUser: [],
    thongTinNguoiDungEdit: {},
    danhSachLoaiNguoiDung: []
}

const UserReducer = createSlice({
    name: "UserReducer",
    initialState,
    reducers: {
       
        setStatusLogin: (state, { type, payload }) => {
            state.isLogin = payload
        },
        
    }
});

export const { loginSuccess, loginFailure, logout,setStatusLogin  } = UserReducer.actions

export default UserReducer.reducer

