import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import useRoute from '../../hooks/useRoute';
import detail from '../../pages/User/detail.css'
export default function MenuCinema(props) {
    const location = useLocation()
    const {navigate} = useRoute()
    const [cinema, setCinema] = useState([]);
    const [CinemaScheduleMovie, setCinemaScheduleMovie] = useState([]);
    const [SelectedCinemaId, setSelectedCinemaId] = useState(null);

        const getAllCinema = async () => {
        const token = localStorage.getItem('token');
            fetch(`/cinema/getAllCinema`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error("Error from backend");
            }).then(data => {
                setCinema(data.data);
                console.log("test cinema",data.data);
                if (data.data.length > 0) {
                    handleCinemaClick(data.data[0].cinemaId);
                }
            
            }).catch(error => {
                // console.error('Error fetching cinemas:', error);
            });
        
       
    }
    
    const getCinemaScheduleMovie = async (cinemaId) => {
        try {
            if (cinemaId !== null ) {
            const token = localStorage.getItem('token');
         
            const response = await fetch(`/schedule/cinema/${cinemaId}/detailed`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            });
    
            if (!response.ok) {
                throw new Error("Error fetching data from backend");
            }
    
            const data = await response.json();
    
            // Nhóm các suất chiếu theo phim
            const groupedByMovie = data.reduce((acc, schedule) => {
                const movieId = schedule[2];
                if (!acc[movieId]) {
                    acc[movieId] = {
                        movieId: movieId,
                        movieTitle: schedule[3],
                        movieImage: schedule[4],
                        scheduleId: schedule[8],
                        showtimes: []
                    };
                }
                acc[movieId].showtimes.push({
                    date: schedule[0],
                    time: schedule[1]
                });
                return acc;
            }, {});
    
            setCinemaScheduleMovie(Object.values(groupedByMovie));
            console.log("Data from backend:", data);
            console.log("Grouped data:", Object.values(groupedByMovie));
        }
     } catch (error) {
            console.error('Error fetching cinemas:', error);
        }
    };
   
    const handleCinemaClick = (cinemaId) => {
        setSelectedCinemaId(cinemaId);
        // getCinemaScheduleMovie(cinemaId); // Gọi hàm để lấy lịch chiếu cho cinemaId đã được bấm vào
    }
    useEffect(() => {
        getAllCinema();
        
        // getCinemaScheduleMovie();
      }, []);
      useEffect(() => {
        if (SelectedCinemaId !== null && SelectedCinemaId !== undefined) {
            getCinemaScheduleMovie(SelectedCinemaId);
        }
    }, [SelectedCinemaId]);
    const renderDanhSachPhim = () => {
        if (!Array.isArray(CinemaScheduleMovie) || CinemaScheduleMovie.length === 0) {
            return null; // hoặc hành động phù hợp khi cinemaId không hợp lệ
        }
        
        return CinemaScheduleMovie.map((itemPhim, iPhim) => ({
            label: (
                <div className='flex border-b pb-4'>
                    <div className='mr-4'>
                        <img className='h-full w-24' src={itemPhim.movieImage}  onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/75/75' }} />
                    </div>
                    <div>
                        <h2 className='font-bold text-left mb-2 text-sm uppercase'><span className='bg-red-600 p-1 rounded-md text-white text-sm'>{itemPhim[5] == true ? "C18" : "C16"}</span> {itemPhim[3]}</h2>
                        <div className='grid grid-cols-2 gap-1'>
                           
                        {Array.isArray(itemPhim.showtimes) && itemPhim.showtimes.map((showtime, index) => (
                            <button key={index} onClick={() => navigate(`booking/${itemPhim.scheduleId}`)} className="bg-gray-100 hover:bg-gray-300 border-2 text-white font-bold py-2 px-4 rounded">
                                <span className='text-green-500'>
                                    {moment(showtime.date).format("DD-MM-YYYY ")}
                                </span>
                                <span className='text-orange-500'>
                                    {moment(showtime.time, "HH:mm:ss").format("HH:mm A")}
                                </span>
                            </button>
                        ))}
                        </div>
                    </div>
                </div>
            ),
            key: iPhim,
            children: null
        }));
    }
    
    const renderCumRap = () => {
        if (!Array.isArray(cinema) || cinema.length === 0) {
            return null; // hoặc hành động phù hợp khi cinemaId không hợp lệ
        }
            
    
        return cinema.map((itemRap, iRap) => ({
            label: (
                <div className='text-left border-b pt-12 pb-12 ' onClick={() => handleCinemaClick(itemRap.cinemaId)}>
                    <h2 className='text-green-500 font-bold text-base'>{itemRap.cinemaName.length > 35 ? itemRap.cinemaName.slice(0, 35) + '...' : itemRap.cinemaName}</h2>
                    <h3 className='text-gray-500 font-semibold text-sm'>{itemRap.cinemaAddress.length > 36 ? itemRap.cinemaAddress?.slice(0, 36) + '...' : itemRap.cinemaAddress}</h3>
                </div>
            ),
            key: iRap,
            
            children:
            (
                <div className='overflow-y-auto max-h-112'> {/* Thêm cuộn */}
                    <Tabs tabPosition='left' defaultActiveKey="1" items={renderDanhSachPhim(itemRap)} />
                </div>
            )        }));
    }
    
    return <>
         <div id='menuCinema' className='MenuCinemaTabs hidden lg:block my-8'>
            <Tabs
                className='shadow-xl pt-3'
                tabPosition='left'
                defaultActiveKey="1"
                items={renderCumRap()} />
        </div> 
    </>
}
