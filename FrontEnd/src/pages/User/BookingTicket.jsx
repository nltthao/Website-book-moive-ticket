import React, { Fragment, useEffect, useState,useRef ,useCallback } from 'react'
import { Tabs } from 'antd'
import moment from 'moment'
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faUserTag } from '@fortawesome/free-solid-svg-icons'
import {  SwalConfig } from '../../utils/config';
import './detail.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const BookingTicket = () => {

    const {scheduleId} = useParams();
    const [user, setUser] = useState([]);
    const [seats, setSeats] = useState([]);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [selectedMovieName, setSelectedMovieName] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState([]);
  
    // const [scheduleIdBook, setScheduleIdBook] = useState(null);
  const [seatIds, setSeatId] = useState([]);
    const [seatStatus, setSeatStatus] = useState(null);
    const seatIdsRef = useRef([]);
    console.log("wwwwwwwwwwww",seatIds);

useEffect(() => {
    const token = localStorage.getItem('token');
        fetch(`/schedule/detail/${scheduleId}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error("Error from backend");
        }).then(data => {
            setSelectedSchedule(data);
            console.log("abcacbacbcabc",data)
        }).catch(error => {
            // console.error('Error fetching cinemas:', error);
        });
    
   
}, [scheduleId]);


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
        //   console.log("mệt quá",data)
        }).catch(error => {
            // console.error('Error fetching cinemas:', error);
        });
    
   
}, []);


 useEffect(() => {
    const token = localStorage.getItem('token');
        fetch(`/seat/${scheduleId}/seat-empty`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error("Error from backend");
        }).then(data => {
            setSeats(data.data);
            console.log("data get api schedule:",data.data);
        }).catch(error => {
            console.error('Error fetching cinemas:', error);
        });
    
   
}, [scheduleId]);
const getSeatClass = (seat) => {
    switch (seat) {
        case 0:
            return "selecting ";
        case 1:
            return "booked";
        case 2:
            return "available";
    }
}

//test tính tiền vé
const [price, setPrice] = useState(45000);
const [selectedSeats, setSelectedSeats] = useState([]);
const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // const handleSeatClick = (rowIndex, seatIndex) => {
    //     const seat = seats[rowIndex].seats[seatIndex];
    //     if (seat.seat_status === null) {
    //         // Thay đổi trạng thái của ghế khi click chọn
    //         const updatedSeat = { ...seat, seat_status: 0, row: seats[rowIndex].row }; // hoặc giá trị tương ứng
    //         const updatedSeats = [...seats];
    //         updatedSeats[rowIndex].seats[seatIndex] = updatedSeat;
    //         setSeats(updatedSeats); // Cập nhật danh sách ghế
    
    //         // Kiểm tra xem ghế đã được chọn chưa trước khi thêm vào danh sách ghế đã chọn
    //         if (!selectedSeats.find(selectedSeat => selectedSeat.seat_id === updatedSeat.seat_id)) {
    //             setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, updatedSeat]); // Thêm ghế đã chọn vào danh sách ghế đã chọn
    //             setSeatId(prevSeatIds => [...prevSeatIds, updatedSeat.seat_id]); // Thêm seat_id vào danh sách seatId
    //         }
           
          
            
            
    //         setHasUnsavedChanges(true);
    //     } else {
    //         // Nếu ghế đã được chọn, loại bỏ khỏi danh sách ghế đã chọn
    //         const updatedSelectedSeats = selectedSeats.filter(selectedSeat => selectedSeat.seat_id !== seat.seat_id);
    //         setSelectedSeats(updatedSelectedSeats);
    //         setSeatId(prevSeatIds => prevSeatIds.filter(seatIds => seatIds !== seat.seat_id)); // Loại bỏ seat_id khỏi danh sách seatId
    //     }
    // };
   // Khôi phục trạng thái từ sessionStorage khi component mount
   

    const handleSeatClick = (rowIndex, seatIndex) => {
        const seat = seats[rowIndex].seats[seatIndex];
        const updatedSeats = [...seats];
        const updatedSeat = { ...seat, row: seats[rowIndex].row };
    
        if (seat.seat_status === null) {
            // Thay đổi trạng thái của ghế khi click chọn
            updatedSeat.seat_status = 0; // hoặc giá trị tương ứng
    
            // Kiểm tra xem ghế đã được chọn chưa trước khi thêm vào danh sách ghế đã chọn
            if (!selectedSeats.find(selectedSeat => selectedSeat.seat_id === updatedSeat.seat_id)) {
                setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, updatedSeat]); // Thêm ghế đã chọn vào danh sách ghế đã chọn
                setSeatId(prevSeatIds => [...prevSeatIds, updatedSeat.seat_id]); // Thêm seat_id vào danh sách seatId
            }
        } else {
            // Nếu ghế đã được chọn, loại bỏ khỏi danh sách ghế đã chọn
            updatedSeat.seat_status = null; // hoặc giá trị tương ứng cho trạng thái không chọn
            const updatedSelectedSeats = selectedSeats.filter(selectedSeat => selectedSeat.seat_id !== seat.seat_id);
            setSelectedSeats(updatedSelectedSeats);
            setSeatId(prevSeatIds => prevSeatIds.filter(seatIds => seatIds !== seat.seat_id)); // Loại bỏ seat_id khỏi danh sách seatId
        }
    
        updatedSeats[rowIndex].seats[seatIndex] = updatedSeat;
        setSeats(updatedSeats); // Cập nhật danh sách ghế
    
        setHasUnsavedChanges(true);
    };
    
    
    const [totalAmount, setTotalAmount] = useState(0);
    const totalAmountRef = useRef(totalAmount);
    const exchangeRate = 23000;
    useEffect(() => {
         // Giá cố định cho mỗi ghế là 10 đơn vị tiền
        const total = selectedSeats.length * price;

        const ids = selectedSeats.map(seat => seat.id);
        setTotalAmount(total);
        totalAmountRef.current = total;
    }, [selectedSeats,price ]);
    console.log("totalAmount:", totalAmount);
    //gọi api book vé
    const [bookId, setBooking] = useState(null);
   
    const createOrder = useCallback((data, actions) => {
       
        const currentTotal = totalAmountRef.current; // Sử dụng giá trị từ ref
        console.log("Total amount in createOrder:", currentTotal);
        const totalUSD = (currentTotal / 23000).toFixed(2); // Chuyển đổi thành USD
        
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: totalUSD,
                    currency_code: 'USD'
                }
            }]
        });
    }, []); 

    useEffect(() => {
        seatIdsRef.current = seatIds;
        console.log('seatIds updated:', seatIds);
    }, [seatIds]); 

  const handlePaymentSuccess = useCallback(async (details, data) => {
        console.log('Payment successful!', details, data);
       

    try {
       
        const token = localStorage.getItem('token');
        const response = await fetch('/book/create', {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ scheduleId, seatIds: seatIdsRef.current, price })
        });

        const responseData = await response.json();

        if (response.ok) {
            SwalConfig('Đăng nhập thành công', 'success', false)
            console.log("Booking successful:", responseData);
            // alert('Thanh toán thành công, cảm ơn bạn đã đặt vé!');
            window.location.reload(true);
          
            
        
        } else {
            throw new Error(responseData.message || 'Lỗi khi gửi yêu cầu API book');
        }
    } catch (error) {
        console.error('Error:', error.message);
        // Xử lý khi có lỗi xảy ra trong quá trình gọi API
    }
}, [scheduleId, seatIds, price]);
   

    const onApprove = useCallback((data, actions) => {
        return actions.order.capture().then(details => {
            handlePaymentSuccess(details, data);
        }).catch(error => {
            console.error('Payment capture error:', error);
           
        });
    }, [handlePaymentSuccess]);

    return (
        <div className='min-h-[100vh]'>
            <div className="grid grid-cols-12 z-[1] pb-2">
                <div className="col-span-12 xl:col-span-10 2xl:col-span-9">
                    <div className='flex justify-center relative mb-2'>
                        <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[2] uppercase font-bold tracking-wider text-white'>Screen</div>
                        <div className='trapezoid'></div>
                    </div>
                    <div className='text-center'>
                  
                   <div className="seat-container">
                   {seats.map((row, rowIndex) => (
                <div key={rowIndex} className="seat-row">
                    <h2 className="row-title"> {row.row}</h2>
                    <div className="seat-numbers">
                        {row.seats.map((seat, seatIndex) => (
                            <div key={seat.seat_id} 
                                className={`seat ${getSeatClass(seat.seat_status)} ${seat.seat_type.toLowerCase() === 'thường' ? 'normal' : 'vip'}`}
                                style={{ pointerEvents: seat.seat_status !== null ? 'none' : 'auto' }}
                                onClick={() => handleSeatClick(rowIndex, seatIndex)}
                            >
                                {seat.number}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
       
                    </div>
                    <div className='mt-5 md:flex md:justify-center hidden'>
                        <table className='divide-y divide-gray-200 w-full'>
                            <thead className='bg-gray-50 p-5'>
                                <tr>
                                    <th>Ghế đã đặt</th>
                                    <th>Ghế thường</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đang chọn</th>
                                   
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                <tr className='text-center'>
                                    <td><button className='ghe gheDaDat'><FontAwesomeIcon icon={faXmark} /></button></td>
                                    <td><button className='ghe'></button></td>
                                    <td><button className='ghe gheVip'></button></td>
                                    <td><button className='ghe gheDangDat'></button></td>
                                    
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-2 2xl:col-span-3">
                    <hr />
                    <div className='my-5'>
                    <h3 className='text-lg mb-2 tracking-wide font-semibold' >Total Price:{totalAmount} </h3>
                   

                    {selectedSchedule && selectedSchedule.length > 0 && (
            <div>
                <h3 className='text-lg mb-2 tracking-wide font-semibold'>{selectedSchedule[0][0]}</h3>
            </div>
             
        )}
        <hr />
        {selectedSchedule && selectedSchedule.length > 0 && (
            <div>
                <p className='mb-2'>Địa điểm: {selectedSchedule[0][1]}</p>
            </div>
        )}
        <hr />
        {selectedSchedule && selectedSchedule.length > 0 && (
            <div>
                <p className='mb-2'>Phòng: {selectedSchedule[0][2]}</p>
            </div>
        )}
        <hr />
        {selectedSchedule && selectedSchedule.length > 0 && (
            <div>
                <p className='mb-2'>Ngày chiếu:  {moment(selectedSchedule[0][3]).format("DD-MM-YYYY ")}</p>
            </div>
        )}
        <hr />
        {selectedSchedule && selectedSchedule.length > 0 && (
            <div>
                <p className='mb-2'>Giờ chiếu: {selectedSchedule[0][4]}</p>
            </div>
        )}
                    </div>
                    <hr />
                    <div className="flex flex-row my-5 items-center">
                        <div className='flex flex-wrap items-center '>
                            <span className='text-black font-semibold text-lg'>Ghế: </span>
                            {selectedSeats.map((selectedSeat, index) => (
                    <span className='text-black font-semibold text-lg'>{`${selectedSeat.row}${selectedSeat.number}`}
                    {index !== selectedSeats.length - 1 && '-'}
                    </span>
                ))}
                        </div>
                    </div>
                    <hr />
                    {user && (
                    <div className='my-5'>
                        <h2>Email: {user.userEmail}</h2>
                       
                    </div>
                    )}
                    <hr />
                    <div className='my-5'>
                        <h2>Phone: {user.userPhone}</h2>
                        
                    </div>
                    <hr />
                    <div className='mb-0 cursor-pointer'>
                        {/* <div onClick={handleSubmit}  className='bg-orange-400 hover:bg-orange-600 text-white w-full text-center py-3 font-bold text-xl'>
                            ĐẶT VÉ
                        </div> */}
                        <div className="App">
      
      <PayPalScriptProvider options={{ clientId: "AXJmHiqIDCCRtVJ8jaAtnExGcicaHFQXRUztYgf4Y9G9QY4aiPs34XaRFFMzaO-G4CSXwATD0lKL3lx_" }}>
           
              <PayPalButtons
                style={{ layout: 'horizontal' }}
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>
    </div>
                    </div>
                </div>
            </div>
        </div>
    )
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
            //   console.log("mệt quá",data)
            }).catch(error => {
                // console.error('Error fetching cinemas:', error);
            });
        
       
    }, []);

    const items = [
        { label: '01. CHỌN GHẾ & ĐẶT VÉ', key: 1, children: BookingTicket() },
        { label: '02. KẾT QUẢ ĐẶT VÉ', key: 2, children: <KetQuaDatVe bookingHistory={bookingHistory} />  },
    ];
    return <>
       <Tabs className='mt-[6rem]  pb-2 min-h-[100vh] booking' items={items} />
    </>;
}

