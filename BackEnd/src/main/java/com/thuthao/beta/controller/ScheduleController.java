package com.thuthao.beta.controller;

import com.thuthao.beta.entity.Schedule;
import com.thuthao.beta.service.CinemaService;
import com.thuthao.beta.service.ScheduleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@Api(description = "Api schedule")
@RequestMapping("/schedule")
public class ScheduleController {
    @Autowired
    ScheduleService scheduleService;
    @Autowired
    CinemaService cinemaService;


    @ApiOperation(value = "Lấy rạp theo suất chiếu")
    @GetMapping("/{schedule_id}")
    public ResponseEntity<?> getCinemaByScheduleId(@PathVariable Integer schedule_id){
        return ResponseEntity.ok(cinemaService.getCinemaByScheduleId(schedule_id));
    }

    @ApiOperation(value = "Get suất chiếu")
    @GetMapping("/{movie_id}/{schedule_date}")
    public ResponseEntity<?> getScheduleCinema(@PathVariable Integer movie_id, @PathVariable String schedule_date){
        return ResponseEntity.ok(scheduleService.getScheduleCinema(movie_id, schedule_date));
    }
    @GetMapping("/getschedule/{movieId}")
    public ResponseEntity<?> getScheduleByMovieId(@PathVariable Integer movieId){
        return ResponseEntity.ok(scheduleService.getScheduleByMovieId(movieId));
    }



    @GetMapping("/detail/{scheduleId}")
    public List<Object[]> getScheduleDetailsByScheduleId(@PathVariable Integer scheduleId) {
        return scheduleService.getScheduleDetailsByScheduleId(scheduleId);
    }

    @GetMapping("/cinema/{cinemaId}")
    public List<Schedule> getSchedulesByCinemaId(@PathVariable Integer cinemaId) {
        return scheduleService.getSchedulesByCinemaId(cinemaId);
    }

    @GetMapping("/cinema/{cinemaId}/detailed")
    public List<Object[]> getDetailedSchedulesByCinemaId(@PathVariable Integer cinemaId) {
        return scheduleService.getDetailedSchedulesByCinemaId(cinemaId);
    }
    @GetMapping("/movie/{movieId}")
    public List<Object[]> findDetailedByMovieId(@PathVariable Integer movieId) {
        return scheduleService.findDetailedByMovieId(movieId);
    }
    //
}
