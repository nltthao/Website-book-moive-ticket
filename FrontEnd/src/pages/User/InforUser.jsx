import React, {  useEffect, useState } from 'react'
import moment from 'moment'
import NotFound from '../NotFound'
import { Tabs } from 'antd'

import _ from "lodash";


const ThongTinNguoiDung = (thongTinNguoiDung) => {
    const [bookingHistory, setBookingHistory] = useState([]);
    const [user, setUser] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
            fetch(`/user/info`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error("Error from backend");
            }).then(data => {
                setUser(data.data);
           
            }).catch(error => {
                // console.error('Error fetching cinemas:', error);
            });
        
       
    }, []);
    // useEffect(()=>{
    //     console.log("dfsdfsfdf",user);
    // },[user])

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
            fetch(`/book/booking-history/${username}`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error("Error from backend");
            }).then(data => {
                setBookingHistory(data);
              
            }).catch(error => {
                // console.error('Error fetching cinemas:', error);
            });
        
       
    }, []);
    


    return <div className='h-[100vh] relative'>
        <section className="p-6 bg-gray-500 w-full md:w-[80%] lg:w-[60%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg">
            <h2 className='text-white font-bold text-2xl mb-4'>Thông tin tài khoản</h2>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {user && (
                <div>
                    <p className='font-semibold text-[17px] mb-1'>Tài khoản</p>
                    <input readOnly type="text"  className='p-2 border-none w-full rounded-sm text-[16px]'  value={user.username}  />
                </div>
            )}
                {user && (
                <div>
                    <p className='font-semibold text-[17px] mb-1'>Họ và tên </p>
                    <input readOnly type="text"  className='p-2 border-none w-full rounded-sm text-[16px]'  value={user.userFullname}  />
                </div>
            )}
                {user && (
                <div>
                    <p className='font-semibold text-[17px] mb-1'>Email</p>
                    <input readOnly type="text"  className='p-2 border-none w-full rounded-sm text-[16px]'  value={user.userEmail}  />
                </div>
            )}
                {user && (
                <div>
                    <p className='font-semibold text-[17px] mb-1'>Số điện thoại</p>
                    <input readOnly type="text"  className='p-2 border-none w-full rounded-sm text-[16px]'  value={user.userPhone}  />
                </div>
            )}
                
            </div>
        </section>
    </div>
}

const KetQuaDatVe = ({ bookingHistory }) => {
    const renderTicketItem = () => {
            return (bookingHistory && bookingHistory.length > 0 && bookingHistory.map((ticket, index) => {
                return (
                    <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                        <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket[1]} />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">{ticket[0]}</h2>
                                <h2 className="text-gray-700 title-font font-medium">Cụm rạp:{ticket[2]}  </h2>
                                <p className="text-gray-500">Phòng:  {ticket[3]}</p>
                                <p className="text-gray-500">Ngày đặt: {moment(ticket[4]).format('DD-MM-YYYY ~ HH:mm:A')}</p>
                                <p>Ghế: {ticket[5]}</p>
                            </div>
                        </div>
                    </div>
                );
            }));
    }
    return <div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-col text-center w-full mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 uppercase">lịch sử đặt vé khách hàng</h1>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>
    </div>
}

export default () => {
    
    const [bookingHistory, setBookingHistory] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
            fetch(`/book/booking-history/${username}`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error("Error from backend");
            }).then(data => {
                setBookingHistory(data);
              console.log("mệt quá",data)
            }).catch(error => {
                // console.error('Error fetching cinemas:', error);
            });
        
       
    }, []);
    
    const items = [
        { label: <span className='text-[11px] sm:text-[14px]'>01. THÔNG TIN NGƯỜI DÙNG</span>, key: 1, children: ThongTinNguoiDung() },
        { label: <span className='text-[11px] sm:text-[14px]'>02. LỊCH SỬ ĐẶT VÉ</span>, key: 2, children: <KetQuaDatVe bookingHistory={bookingHistory} />},
    ];
    
    return (
        <>
           <Tabs className='pt-[6rem] min-h-[100vh] booking' items={items} />
        </>

    )
}


