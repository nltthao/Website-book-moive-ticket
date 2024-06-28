package com.thuthao.beta.controller;

import com.thuthao.beta.service.CinemaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@Api(description = "Api cinemas")
@RequestMapping("/cinema")
public class CinemaController {

    @Autowired
    CinemaService cinemaService;



    @ApiOperation(value = "Lấy danh sách các rạp")
    @GetMapping("/getAllCinema")
    public ResponseEntity<?> getAllCinema(){
        return ResponseEntity.ok(cinemaService.getAllCinema());
    }
    @ApiOperation(value = "Lấy rạp theo suất chiếu")
    @GetMapping("/{schedule_id}")
    public ResponseEntity<?> getCinemaByScheduleId(@PathVariable Integer schedule_id){
        return ResponseEntity.ok(cinemaService.getCinemaByScheduleId(schedule_id));
    }

    @GetMapping("/getcinema/{movieId}")
    public ResponseEntity<?> getCinemasByMovieId(@PathVariable Integer movieId){
        return ResponseEntity.ok(cinemaService.getCinemasByMovieId(movieId));
    }



}
