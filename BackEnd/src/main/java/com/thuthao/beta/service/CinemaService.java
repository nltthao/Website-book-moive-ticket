package com.thuthao.beta.service;

import com.thuthao.beta.entity.Cinema;
import com.thuthao.beta.entity.Movie;
import com.thuthao.beta.entity.Schedule;
import com.thuthao.beta.model.ResponseData;
import com.thuthao.beta.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CinemaService {
    @Autowired
    CinemaRepository cinemaRepository;
    public ResponseData<Cinema> getAllCinema(){
        return new ResponseData(HttpStatus.OK, "success", cinemaRepository.findAll());
    }
    public List<Cinema> listAllCinema(String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return cinemaRepository.findAll();
        }
        return cinemaRepository.search(keyword);
    }


    public ResponseData<Cinema> getCinemaByScheduleId(Integer schedule_id){
        return new ResponseData(HttpStatus.OK, "success", cinemaRepository.getCinemasByIdSchedule(schedule_id));
    }
    public List<Cinema> getCinemasByMovieId(Integer movieId) {
        return cinemaRepository.getCinemasByMovieId(movieId);
    }
//    public ResponseData<Cinema> getCinemasByMovieId(Integer movieId){
//        return new ResponseData(HttpStatus.OK, "success", cinemaRepository.getCinemasByMovieId(movieId));
//    }
public Cinema addCinema(Cinema cinema) {
    return cinemaRepository.save(cinema);
}
    public void deleteCinema(Integer cinema_id) {
        cinemaRepository.deleteById(cinema_id);
    }
    public Cinema updateCinema(Cinema cinema) {
        Cinema existingCinema = cinemaRepository.findById(cinema.getCinemaId()).get();
        existingCinema.setCinemaName(cinema.getCinemaName());
        existingCinema.setCinemaAddress(cinema.getCinemaAddress());


        Cinema updatedCinema = cinemaRepository.save(existingCinema);
        return updatedCinema;
    }

}
