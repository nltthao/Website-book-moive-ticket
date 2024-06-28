import React, { useState, useEffect } from 'react'
import moment from 'moment';

// import { getAuthToken } from "../../services/BackendService";

import useRoute from '../../hooks/useRoute';
import { history } from '../../utils/history'
export default function BookingTicketNow(props) {
   
    const [movies, setMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [schedules, setSchedules] = useState([]);
 
    const [movieId, setMovieId] = useState(null); // Khởi tạo state cho movieId
    const [scheduleId, setScheduleId] = useState(null);
    const [cinemaId, setCinemaId] = useState(null);

    const [loggedIn, setLoggedIn] = useState(false);
    const [CinemaScheduleMovie, setCinemaScheduleMovie] = useState([]);
    // const [selectedCinema, setSelectedCinema] = useState('');
    // const [selectedMovie, setSelectedMovie] = useState('');
    
    const [selectedCinemaId, setSelectedCinemaId] = useState('');
const { navigate } = useRoute()


const checkLoggedIn = () => {
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn ) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
  };
   // Sử dụng useEffect để gọi hàm checkLoggedIn khi component được render
   useEffect(() => {
    checkLoggedIn();
  }, []);

  useEffect(() => {
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
            setMovies(data.data);
           console.log("lay duoc data all phim", data.data)
        }).catch(error => {
            console.error('Error fetching cinemas:', error);
        });
    }
    getMovie();
}, []);
    useEffect(() => {
        if (movieId !== null) {
            // getCinema();
            getAllCinema();
            // getSchedule();
            // getMovie();
        }
    }, [movieId]);
        
       
       
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
                    setCinemas(data.data);
                    console.log("lay duoc rap",data.data);
                    // if (data.data.length > 0) {
                    //     handleCinemaClick(data.data[0].cinemaId);
                    // }
                
                }).catch(error => {
                    // console.error('Error fetching cinemas:', error);
                });
            
           
        } 
    
   

   
    
        const getScheduleMovieId  = async () => {
        const token = localStorage.getItem('token');
            fetch(`/schedule/movie/${movieId}`, {
                method: "GET",
                headers: { 'Authorization': `Bearer ${token}` }
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                throw new Error("Error from backend");
            }).then(data => {
               
                const filteredSchedules = data.filter(schedule => schedule[9] === parseInt(cinemaId));
                setCinemaScheduleMovie(filteredSchedules);

    // setCinemaScheduleMovie(data);
    // console.log("l",filteredSchedules);
              
                
            }).catch(error => {
                console.error('Error fetching cinemas:', error);
            });
        
   
};
  useEffect(() => {
    if(movieId){
        getScheduleMovieId();
    }
      }, [movieId,cinemaId]);

    const handleMovieChange = (event) => {
        const selectedId = event.target.value;
       
        setMovieId(selectedId);
      
    };  
   
        // const selectedId = event.target.value;
      
        // setCinemaId(selectedId);
        const handleCinemaChange = (e) => {
            const selectedCinemaId = e.target.value;
    setCinemaId(selectedCinemaId);
   
        };
      
  
        const renderScheduleOptions = () => {
            if (!cinemaId) return null;
        
            return CinemaScheduleMovie.map(schedule => {
              
              const scheduleCinemaId = schedule[9];
              console.log("kkkkkkk",scheduleCinemaId)
             
              if (scheduleCinemaId === parseInt(cinemaId)) {
                
                const date = schedule[0];
                const time = schedule[1];
        console.log("ooooo",date)
                return (

                  <option key={schedule[8]} value={schedule[8]}>
                    {moment(date).format("DD-MM-YYYY ")} ~ {moment(time, "HH:mm:ss").format("HH:mm A")}
                  </option>
                );
              }
        
              return null;
            });
          };
    

    
      const handleScheduleChange = (event) => {
        const selectedId = event.target.value;
        
        setScheduleId(selectedId);

      
    }; 
    const handleSubmit = () => {
      
     if (loggedIn) {
        if( movieId && scheduleId && cinemaId){
            navigate(`/booking/${scheduleId}`);
        }else{
            alert('Vui lòng chọn đầy đủ thông tin phim, rạp và ngày giờ chiếu!');
        }
    
    } else {
        alert('Vui lòng đăng nhập trước khi đặt vé!');
    //   history.replace({ pathname: '/login' })
    }
       
            
        
      };
    
    

    return (
        <div className=' bg-white rounded-lg shadow-2xl text-white py-7 px-8 w-full xl:w-3/4 mx-auto translate-y-[-50%] hidden md:block'>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="grid md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-7 gap-2">
            
               
                <select  name='phimDangChon'  className='text-black border-2 rounded-md border-slate-600 cursor-pointer 2xl:col-span-2 h-[2.5rem]'  onChange={handleMovieChange} >
                <option  defaultValue='Phim'>Phim </option>
                {movies && movies.length > 0 && movies?.map(movie => (
    <option key={movie.movieId} value={movie.movieId}>{movie.movieName}</option>
))}
                </select>
 
                <select 
    name='rapDangChon' className='text-black border-2 rounded-md border-slate-600 cursor-pointer 2xl:col-span-2 h-[2.5rem]' onChange={handleCinemaChange}>
                    <option defaultValue='Rạp'> Rạp</option>
                    {cinemas && cinemas.length > 0 && cinemas.map(cinema => (
    <option key={cinema.cinemaId} value={cinema.cinemaId}>{cinema.cinemaName}</option>
))}

                </select>

                <select name='lichChieuDangChon'  id='maLichChieuPhim' className='text-black border-2 rounded-md border-slate-600 cursor-pointer 2xl:col-span-2 h-[2.5rem]'onChange={handleScheduleChange}>
                    <option value='' defaultValue >Ngày giờ chiếu</option>
                    {renderScheduleOptions()}
                </select>
              

                <button  className='p-2 bg-orange-400 rounded-md font-semibold tracking-wide h-[2.5rem]'>Đặt Vé Nhanh</button>
            </form>
        </div>
    )
}
