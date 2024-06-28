import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import MultipleRowSlick from './MultipleRowSlick';
import BookingTicketNow from './BookingTicketNow';
import { useLocation } from 'react-router-dom';
import useRoute from '../../hooks/useRoute';




export default function MovieList(props) {
    const { arrFilm } = props
    const [keyword, setKeyword] = useState('')
    const {navigate} = useRoute()

    const location = useLocation()

    useEffect(() => {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1))
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth" })
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        }
    }, [location,])


    const [moviesNow, setMoviesnow] = useState([]);
    const [moviesFuture, setMoviesfuture] = useState([]);

 
    useEffect(() => {
        const fetchMoviesNow = async () => {
            try {
                const response = await fetch('/movies/now', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
    
                const data = await response.json();
                
                if (response.ok) {
                    setMoviesnow(data.data);
                    console.log("data của phim dang chieu",moviesNow);
                    
                } else {
                    // Xử lý đăng nhập thất bại và hiển thị thông báo lỗi từ backend
                 
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMoviesNow();

    }, []);

    useEffect(() => {
        const fetchMoviesFuture = async () => {
            try {
                const response = await fetch('/movies/future', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
    
                const data = await response.json();
                
                if (response.ok) {
                    setMoviesfuture(data.data);
                 
                      console.log("data của phim sap chieu",moviesFuture);
                } else {
                    // Xử lý đăng nhập thất bại và hiển thị thông báo lỗi từ backend
                 
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMoviesFuture();

    }, []);


    return (
        <div id='movie-list' className="movie-list container mx-auto md:px-8 lg:px-10">

            {/* Laptop */}
            <BookingTicketNow />
            <Tabs className='hidden md:block' defaultActiveKey="1" items={[
                { label: 'Phim đang chiếu', key: '1', children: <MultipleRowSlick moviesNow={moviesNow} /> },
                { label: 'Phim sắp chiếu', key: '2', children: <MultipleRowSlick  moviesFuture={moviesFuture}/> },
            ]} />

           </div> 
    )
}
