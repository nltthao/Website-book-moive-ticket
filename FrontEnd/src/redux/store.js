import { configureStore } from "@reduxjs/toolkit";
import BannerReducer from './reducers/BannerReducer'
import UserReducer from './reducers/UserReducer'


export const store = configureStore({
    reducer: {
        BannerReducer,
        UserReducer,
        
       
        

    }
})

