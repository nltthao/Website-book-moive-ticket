import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Progress, Modal } from 'antd';
import useRoute from '../../hooks/useRoute'
import LoadingPage from '../LoadingPage'
import ShowtimeDetail from '../../components/Detail/ShowtimeDetail';

import { useParams } from 'react-router-dom';

export default function Detail() {
    let { movieId } = useParams();
    const [percent, setPercent] = useState(0);
    const { param, navigate } = useRoute()
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [moviesDetail, setMoviesDetail] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

     useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchMovies = async () => {
            try {
                const response = await fetch('/movies', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
    
                const data = await response.json();
                
                if (response.ok) {
                    setMoviesDetail(data.data);
                 
                      console.log("data chi tiết phim",data.data);
                } else {
                    // Xử lý đăng nhập thất bại và hiển thị thông báo lỗi từ backend
                 
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();

    }, []);


    const item = moviesDetail[movieId];

    
    const showModal = (link) => {
        // dispatch(getModalVideo(link))
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    function getYouTubeID(url) {
        // Sử dụng biểu thức chính quy để tìm ID video từ URL
        const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regExp);
        // Nếu có kết quả từ việc trích xuất ID, trả về ID video; ngược lại, trả về null
        return match ? match[1] : null;
      }
    return (
        <div>

            <div className='relative film-detail'>
            {item && (
                <img src={item.moviePoster} className='w-full h-[90rem] lg:h-[80rem] object-cover object-top blur-md' />
            )}
                <div className="container absolute z-[5] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[70%] p-4">
                    <div className='md:flex'>
                    {item && (
                        <img className='w-80 md:w-80 h-full' src={item.moviePoster} />
                    )}
                        <div className='md:pl-8 '>
                        {item && (
                            <div> 
                            <h2 className='text-white tracking-wide text-[1rem] md:text-[1.3rem] lg:text-[1.5rem] uppercase mb-10 mt-5 font-semibold'> {item.movieName}</h2>
                            <p className='text-gray-300 tracking-wide text-justify mb-5'>{item.movieDescription}</p>
                            <p className='text-white text-[1rem] mb-5 mt-2'>Phân loại<span className='text-red-600 tracking-wide text-justify' > {item.movieCens}</span></p>
                            <p className='text-white tracking-wide mb-5 text-justify'>Định dạng: <span className='text-green-600 tracking-wide text-justify' >{item.movieFormat}</span></p>
                            <p className='text-white tracking-wide mb-5 text-justify'>Thể loại: {item.movieGenres}</p>
                            <p className='font-bold text-white mt-2'>{item.movieLength}</p>
                            </div>
                        )}
                            <div className='hidden xl:block'>
                            {item && (
                                <button onClick={() => showModal(item.movieTrailer)}className="bg-transparent tracking-widest text-[16px] hover:bg-blue-500 text-white font-semibold hover:text-white border-blue-500 border-[3px] hover:border-transparent rounded uppercase px-[5rem] py-[0.7rem] mt-4 ">
                                    Trailer
                                </button>
                            )}
                            {isModalOpen ? <Modal
                                        footer={null}
                                        centered
                                        closable={false}
                                        open={isModalOpen}
                                        onCancel={handleCancel}>
                                            {item && (
                                        <iframe id='videoId' width='100%' height='100%' src={`https://www.youtube.com/embed/${getYouTubeID(item.movieTrailer)}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                    )}
                                        </Modal> : ''}

                                <a href='#showtime' className="bg-transparent tracking-widest text-[16px] hover:bg-orange-400 text-white font-semibold hover:text-white border-orange-500 border-[3px] hover:border-transparent rounded uppercase px-[5rem] py-[0.7rem] mt-4 ml-4">
                                    Đặt vé
                                </a>
                            </div>
                        </div>
                        <div className='hidden xl:block pl-6' >
                            <Progress trailColor="#e6f4ff" status='success' type="circle" percent={percent} />
                        </div>
                        <div className='overlayDetail'></div>

                    </div>
                    
                      <ShowtimeDetail /> 
                </div>

            </div>
           


        </div>
    )
}
