import React , { useState, useEffect }from 'react'
import { Card } from 'antd';
import Slider from "react-slick";
import useRoute from '../../hooks/useRoute';
// import avatar from '../../assets/img/avatar.jpg'
// import onepiece from '../../assets/img/onepiece.jpg'


export default function MultipleRowSlick({ moviesNow, moviesFuture }) {
    const {navigate} = useRoute();
   

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, background: "transparent" }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (    
            <div
                className={className}
                style={{ ...style, background: "transparent" }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "40px",
        slidesToShow: 4,
        speed: 500,
        rows: 2,
        slidesPerRow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        dots: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: "0",
                    rows: 2,
                    slidesPerRow: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerPadding: "0",
                    rows: 2,
                    slidesPerRow: 1,
                }
            },

        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className='animate__animated animate__fadeInUp animate__fast pb-4'>
            <Slider {...settings}>
            {moviesNow && moviesNow.length > 0 && moviesNow.map(movieN => (
                    <Card className='slick-card' bordered={false} key={movieN.movieId} value={movieN.movieId}>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src={movieN.moviePoster} className='w-full h-full' />
                                </div>
                                <div className="flip-card-back">
                                    <div className='overlay-card-back'></div>
                                    <img src={movieN.moviePoster} className='w-full h-full'  onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/75/75' }} />
                                    <button onClick={()=> navigate(`detail/${movieN.movieId}`)} className='btn-card text-base uppercase'>Mua Vé</button>
                                </div>
                            </div>
                        </div>
                        <h2 className='film-name-card mt-3 uppercase font-medium'>{movieN.movieName}</h2>
                    </Card>
                    ))}
                     </Slider>
                      <Slider {...settings}>
                    {moviesFuture && moviesFuture.length > 0 && moviesFuture.map(movieF => (
                    <Card className='slick-card' bordered={false} key={movieF.movieId} value={movieF.movieId}>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src={movieF.moviePoster} className='w-full h-full' />
                                </div>
                                <div className="flip-card-back">
                                    <div className='overlay-card-back'></div>
                                    <img src={movieF.moviePoster} className='w-full h-full'  onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/75/75' }} />
                                    <button onClick={()=> navigate(`detail/${movieF.movieId}`)} className='btn-card text-base uppercase'>Mua Vé</button>
                                </div>
                            </div>
                        </div>
                        <h2 className='film-name-card mt-3 uppercase font-medium'>{movieF.movieName}</h2>
                    </Card>
                    ))}
                
            </Slider>
        </div>
    )
}
