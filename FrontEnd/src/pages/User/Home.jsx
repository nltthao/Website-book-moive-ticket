import React ,  { useState } from 'react'
import MovieList from '../../components/Home/MovieList'

import MenuCinema from '../../components/Home/MenuCinema'
import HomeCarousel from '../../components/Home/HomeCarousel'
import LoadingPage from '../LoadingPage'


export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    
    return (
        <div>
       
            <HomeCarousel />
            <MovieList  />
            <MenuCinema  />
       
    </div>
    )
}
