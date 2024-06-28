import { createSlice } from '@reduxjs/toolkit'
// import avatar from '../../assets/img/carousel3.jpg'
import inside from '../../assets/img/inside.jpg'
import pussInBoots from '../../assets/img/pussInBoots.jpg'
import doraemon from '../../assets/img/doraemon.jpg'
import minion from '../../assets/img/minion.jpg'
const initialState = {
    data: [
        {
            maBanner: 4,
            link: 'https://youtu.be/LtNYaH61dXY?si=CE98Qjb0modMySCp',
            img: minion
        },
        {
            maBanner: 3,
            link: 'https://youtu.be/mOg5Y-ywFgc?si=_0RtH0ImunSnE4tL',
            img: doraemon
        },
        {
            maBanner: 2,
            link: 'https://youtu.be/AfOlW2OrzqE?si=pe1rGuHCVw_d7Sb0',
            img: inside
        },
        {
            maBanner: 1,
            link: 'https://www.youtube.com/watch?v=fovTZDDPgAQ',
            img: pussInBoots
        },
    ],
    modalData: ''
}

const BannerReducer = createSlice({
    name: "BannerReducer",
    initialState,
    reducers: {
        getBannerMovie: (state, { type, payload }) => {
            return { ...state }
        },
        getModalVideo: (state, { type, payload }) => {
            const videoId = getId(payload)
            return { ...state, modalData: videoId }
        }
    }
});

export const { getBannerMovie, getModalVideo } = BannerReducer.actions

export default BannerReducer.reducer

function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}