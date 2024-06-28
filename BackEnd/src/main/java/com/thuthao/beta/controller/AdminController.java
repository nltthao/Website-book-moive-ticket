package com.thuthao.beta.controller;

import com.thuthao.beta.entity.Cinema;
import com.thuthao.beta.entity.Movie;
import com.thuthao.beta.entity.Schedule;
import com.thuthao.beta.entity.User;
import com.thuthao.beta.service.*;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    MovieSevice movieSevice;
    @Autowired
    BookService bookService;
    @Autowired
    UserService userService;
    @Autowired
    CinemaService cinemaService;
    @Autowired
    ScheduleService scheduleService;
//movies
    @ApiOperation(value = "Lấy danh sách phim")
    @GetMapping("/getAllMovies")
    public ResponseEntity<?> getAllMovies(@RequestParam(required = false, defaultValue = "")  String keyword){
        List<Movie> movies = movieSevice.listAll(keyword);
        return ResponseEntity.ok(movies);
    }

    @PostMapping("/addmovie")
    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
        Movie savedmovie = movieSevice.addMovie(movie);
        return new ResponseEntity<>(savedmovie, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{movie_id}")
    public void deleteMovie(@PathVariable Integer movie_id) {
        movieSevice.deleteMovie(movie_id);
    }

    @PutMapping("/put/{movie_id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable  Integer movie_id, @RequestBody Movie movie){
        movie.setMovieId(movie_id);
        Movie updatedMovie = movieSevice.updateMovie(movie);
        return new ResponseEntity<>(updatedMovie, HttpStatus.OK);
    }


    //user
    @ApiOperation(value = "Lấy danh sách người dùng")
    @GetMapping("/getAllUsers")
    public ResponseEntity<?> getAllUsers(@RequestParam(required = false, defaultValue = "")  String keyword){
        List<User> users = userService.listAll(keyword);
        return ResponseEntity.ok(users);
    }

    @PostMapping("/adduser")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User saveduser = userService.adduser(user);
        return new ResponseEntity<>(saveduser, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteUser/{user_id}")
    public void deleteUser(@PathVariable Integer user_id) {userService.deleteUser(user_id);
    }


@PutMapping("/putUser/{userId}")
public ResponseEntity<User> updateUser(@PathVariable int userId, @RequestBody User updatedUser) {
    // Ensure the updatedUser has the correct userId
    if (updatedUser.getUserId() != userId) {
        return ResponseEntity.badRequest().build();
    }

    User user = userService.updateUser(userId, updatedUser); // Sử dụng userId và updatedUser để cập nhật thông tin người dùng
    return ResponseEntity.ok(user);
}
    @DeleteMapping("/deleteUser/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable int userId) {
        userService.deleteUser(userId);
        return ResponseEntity.noContent().build();
    }
    //thong ke
    @GetMapping("/total")
    public ResponseEntity<BigDecimal> getTotalAllCinemasRevenue() {

        BigDecimal totalRevenue = bookService.getTotalAllCinemasRevenue();
        return ResponseEntity.ok(totalRevenue);
    }
    //%

    @GetMapping("/percentage")
    public ResponseEntity<Map<String, BigDecimal>> getCinemasRevenuePercentage(
            @RequestParam(value = "startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(value = "endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        Map<String, BigDecimal> cinemaPercentageRevenueMap = bookService.calculateCinemasRevenuePercentage(startDate, endDate);
        return ResponseEntity.ok(cinemaPercentageRevenueMap);
    }
    //
    @ApiOperation(value = "Lấy danh sách suất chiếu")
    @GetMapping("/getAllSchedule")
    public ResponseEntity<?> getAllSchedule(){
        return ResponseEntity.ok(scheduleService.listAllSchedule());
    }

    @PostMapping("/addschedule")
    public ResponseEntity<Schedule> addMovie(@RequestBody Schedule schedule) {
        Schedule savedschedule = scheduleService.addSchedule(schedule);
        return new ResponseEntity<>(savedschedule, HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteSchedule/{schedule_id}")
    public void deleteSchedule(@PathVariable Integer schedule_id) {
        scheduleService.deleteSchedule(schedule_id);
    }


    @PutMapping("/putSchedule/{schedule_id}")
    public ResponseEntity<Schedule> updateSchedule(@PathVariable  Integer schedule_id, @RequestBody Schedule schedule){
        schedule.setScheduleId(schedule_id);
        Schedule updatedSchedule = scheduleService.updateSchedule(schedule);
        return new ResponseEntity<>(updatedSchedule, HttpStatus.OK);
    }
    //

    @ApiOperation(value = "Lấy danh sách rạp")
    @GetMapping("/getAllCinema")
    public ResponseEntity<?> getAllCinema(@RequestParam(required = false, defaultValue = "")  String keyword){
        List<Cinema> cinema = cinemaService.listAllCinema(keyword);
        return ResponseEntity.ok(cinema);
    }
    @PostMapping("/addcinema")
    public ResponseEntity<Cinema> addCinema(@RequestBody Cinema cinema) {
        Cinema savedCinema = cinemaService.addCinema(cinema);
        return new ResponseEntity<>(savedCinema, HttpStatus.CREATED);
    }
    @DeleteMapping("/deleteCinema/{cinema_id}")
    public void deleteCinema(@PathVariable Integer cinema_id) {
        cinemaService.deleteCinema(cinema_id);
    }

    @PutMapping("/putCinema/{cinema_id}")
    public ResponseEntity<Cinema> updateCinema(@PathVariable  Integer cinema_id, @RequestBody Cinema cinema){
        cinema.setCinemaId(cinema_id);
        Cinema updatedCinema = cinemaService.updateCinema(cinema);
        return new ResponseEntity<>(updatedCinema, HttpStatus.OK);
    }
}
