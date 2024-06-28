package com.thuthao.beta.service;

import com.thuthao.beta.entity.Movie;
import com.thuthao.beta.entity.Schedule;
import com.thuthao.beta.model.ResponseData;
import com.thuthao.beta.model.ResponseScheduleCinema;
import com.thuthao.beta.repository.CinemaRepository;
import com.thuthao.beta.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
public class ScheduleService {
    @Autowired
    ScheduleRepository scheduleRepository;

    @Autowired
    CinemaRepository cinemaRepository;
//    public ResponseData<Cinema> getAllSchedule(){
//        return new ResponseData(HttpStatus.OK, "success", scheduleRepository.findAll());
//    }

    public ResponseData<ResponseScheduleCinema> getScheduleCinema(Integer movie_id, String schedule_date){
        List<ResponseScheduleCinema> rs = scheduleRepository.getSchedule(movie_id, schedule_date);
        if(CollectionUtils.isEmpty(rs)){
            return new ResponseData(HttpStatus.NOT_FOUND,"not found schedule", null);
        }else{
            return new ResponseData(HttpStatus.OK,"success", scheduleRepository.getSchedule(movie_id, schedule_date));
        }
    }
    public List<Schedule> getScheduleByMovieId(Integer movieId) {
        return scheduleRepository.getScheduleByMovieId(movieId);
    }





    public List<Object[]> getScheduleDetailsByScheduleId(Integer scheduleId) {

        return scheduleRepository.getScheduleDetailsByScheduleId(scheduleId);

    }


    public List<Schedule> getSchedulesByCinemaId(int cinemaId) {
        return scheduleRepository.findByCinemaId(cinemaId);
    }

    public List<Object[]> getDetailedSchedulesByCinemaId(int cinemaId) {
        return scheduleRepository.findDetailedByCinemaId(cinemaId);
    }
    //movieID
    public List<Object[]> findDetailedByMovieId(int movieId) {
        return scheduleRepository.findDetailedByMovieId(movieId);
    }

    public ResponseData<Schedule> listAllSchedule(){
        return new ResponseData(HttpStatus.OK, "success", scheduleRepository.findAll());
    }

    public Schedule addSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
    public void deleteSchedule(Integer schedule_id) {
        scheduleRepository.deleteById(schedule_id);
    }
    public Schedule updateSchedule(Schedule schedule) {
        Schedule existingSchedule = scheduleRepository.findById(schedule.getScheduleId()).get();
        existingSchedule.setMovieId(schedule.getMovieId());
        existingSchedule.setRoomId(schedule.getRoomId());
        existingSchedule.setScheduleDate(schedule.getScheduleDate());
        existingSchedule.setScheduleStart(schedule.getScheduleStart());


        Schedule updatedSchedule = scheduleRepository.save(existingSchedule);
        return updatedSchedule;
    }

}
