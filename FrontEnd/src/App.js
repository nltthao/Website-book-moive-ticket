import { Route, Routes,Navigate , unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { history } from './utils/history'

import UserTemplate from './templates/UserTemplate/UserTemplate';

import Home from './pages/User/Home';
import Detail from './pages/User/Detail';
import NotFound from './pages/NotFound';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import InforUser from './pages/User/InforUser';
import BookingTicket from './pages/User/BookingTicket';
import News from './pages/User/News';


import AdminTemplate from './templates/AdminTemplate/AdminTemplate'

import Dboard from './pages/Admin/Dboard';
import Film from './pages/Admin/Film/Film';
import Schedule from './pages/Admin/Schedule/Schedule';
import EditSchedule from './pages/Admin/Schedule/EditSchedule';
import AddNewSchedule from './pages/Admin/Schedule/AddNewSchedule';

import Users from './pages/Admin/Users/Users'
import EditFilm from './pages/Admin/Film/EditFilm';
import AddNewFilm from './pages/Admin/Film/AddNewFilm';

import EditUser from './pages/Admin/Users/EditUser';
import Cinema from './pages/Admin/Cinema/Cinema';
import EditCinema from './pages/Admin/Cinema/EditCinema';
import AddNewCinema from './pages/Admin/Cinema/AddNewCinema';
function App() {
    return (
        <HistoryRouter history={history}>
            <Routes>
            <Route path='/' element={<UserTemplate />}>
                    <Route index path='/' element={<Home />} />
                    <Route path='*' element={<NotFound />} />
                    <Route path='notfound' element={<NotFound />} />
                    <Route path='detail/:movieId' element={<Detail />} />
                    <Route path='inforUser' element={<InforUser />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                   
                    <Route path='news' element={<News />} />
                    <Route path='booking/:scheduleId' element={<BookingTicket />} />
                </Route>
                <Route path='/admin' element={<AdminTemplate  />}>
               
                    <Route path='/admin' index element={<Dboard />} />
                   
                    <Route path='user' element={<Users />} />
                  
                    <Route path='user/edit/:userId' element={<EditUser />} />
                    <Route path='film' element={<Film />} /> 
                    <Route path='film/edit/:movieId' element={<EditFilm />}/>
                    <Route path='schedule' element={<Schedule />} /> 
                    <Route path='schedule/edit/:scheduleId' element={<EditSchedule />}/>
                    <Route path='schedule/addnewschedule' element={<AddNewSchedule />}/>
                    <Route path='cinema' element={<Cinema />} /> 
                    <Route path='cinema/edit/:cinemaId' element={<EditCinema />}/>
                    <Route path='cinema/addnewscinema' element={<AddNewCinema />}/>
                    
                    <Route path='film/addnewfilm' element={<AddNewFilm />}/>
                </Route>
            </Routes>
        </HistoryRouter>
    );
}
export default App;
