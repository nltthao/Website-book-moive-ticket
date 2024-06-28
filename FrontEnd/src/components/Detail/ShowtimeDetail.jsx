import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import moment from 'moment';
import useRoute from '../../hooks/useRoute';
import { useParams } from 'react-router-dom';

export default function ShowtimeDetail() {
    let { movieId } = useParams();
    console.log("rrrrrrrrrr",movieId);
    const {navigate} = useRoute()
    const [cinemaId, setCinemaId] = useState(null);
    const [cinema, setCinema] = useState([]);
    const [CinemaScheduleMovie, setCinemaScheduleMovie] = useState([]);
    const [SelectedCinemaId, setSelectedCinemaId] = useState([]);

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
                    const firstCinemaId = data.data[0].cinemaId; // Lấy cinemaId của rạp đầu tiên
                handleCinemaClick(firstCinemaId); // Gọi hàm để xử lý khi chọn rạp chiếu phim
                setCinemaId(firstCinemaId); // Lưu cinemaId vào state
                }
            
            }).catch(error => {
                // console.error('Error fetching cinemas:', error);
            });
        
       
    }
    const getCinemaScheduleMovie = async (cinemaId) => {
        const token = localStorage.getItem('token');
            fetch(`/schedule/cinema/${cinemaId}/detailed`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error("Error from backend");
            }).then(data => {
                console.log("Data from movie:", movieId);
                console.log("Data from API:", data);
                // const filteredSchedules = data.filter(schedule => schedule[2] === movieId);
                // console.log("Filtered Schedules:", filteredSchedules);
                const filteredSchedules = data.filter(schedule => {
                    console.log("Schedule:", schedule);
                    console.log("Comparing with movieId:", movieId);
                    return schedule[2].toString() === movieId.toString();
                });
                console.log("Filtered Schedules:", filteredSchedules);
                 // Nhóm các suất chiếu theo phim
        const groupedByMovie = filteredSchedules.reduce((acc, schedule) => {
            const movie = schedule[2];
            console.log("Processing schedule:", schedule);
            if (!acc[movie]) {
                acc[movie] = {
                    movieId: movie,
                    movieTitle: schedule[3],
                    movieImage: schedule[4],
                    scheduleId: schedule[8],
                    showtimes: []
                };
            }
            acc[movie].showtimes.push({
                date: schedule[0],
                time: schedule[1]
            });
            return acc;
        }, {});
        setCinemaScheduleMovie(Object.values(groupedByMovie));
                // setCinemaScheduleMovie(data);
                console.log("aaaaaaaaa",data);
                console.log("uuuuuuuuu", Object.values(groupedByMovie));
            }).catch(error => {
                console.error('Error fetching cinemas:', error);
            });
        
       
    }
    const handleCinemaClick = (cinemaId) => {
        setSelectedCinemaId(cinemaId);
        console.log("lấy được id rạp",cinemaId);
        // getCinemaScheduleMovie(cinemaId); // Gọi hàm để lấy lịch chiếu cho cinemaId đã được bấm vào
    }
    useEffect(() => {
        getAllCinema();
        
      }, [movieId]);
      useEffect(() => {
        if (SelectedCinemaId !== null) {
            getCinemaScheduleMovie(SelectedCinemaId);
        }
    }, [SelectedCinemaId]);
    useEffect(() => {
        if (movieId) {
            getCinemaScheduleMovie(cinemaId, movieId);
        } else {
            console.log('Movie ID is undefined or null');
        }
    }, [cinemaId, movieId]);


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
                           
                        {Array.isArray(itemPhim.showtimes) && itemPhim.showtimes?.slice(0, 4).map((showtime, index) => (
                            <button key={index} onClick={() => navigate(`/booking/${itemPhim.scheduleId}`)} className="bg-gray-100 hover:bg-gray-300 border-2 text-white font-bold py-2 px-4 rounded">
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
            
            children:(
                <div className='overflow-y-auto max-h-96'> {/* Thẻ chứa cuộn */}
                    <Tabs
                        tabPosition='left'
                        defaultActiveKey="1"
                        items={renderDanhSachPhim(itemRap)}
                    />
                </div>
            ) 
        }));
    }
    
    return <>
         <div id='showtime' className='container hidden lg:block bg-white showtimeTab mb-8 mt-24 scroll-mt-[11rem]'>
            <Tabs
                className='shadow-xl pt-3'
                tabPosition='left'
                defaultActiveKey="1"
                items={renderCumRap()} />
        </div> 
    </>

}