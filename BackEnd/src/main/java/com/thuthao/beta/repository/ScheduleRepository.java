package com.thuthao.beta.repository;

import com.thuthao.beta.entity.Movie;
import com.thuthao.beta.entity.Schedule;
import com.thuthao.beta.model.*;
import com.thuthao.beta.model.ResponseCinema;
import com.thuthao.beta.model.ResponseScheduleCinema;
import com.thuthao.beta.model.ResponseScheduleTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    Schedule findByScheduleId(Integer schedule_id);
    @Query(nativeQuery = true, name = "getResponseCinema")
    List<ResponseCinema> getScheduleCinema(Integer movie_id, String schedule_date);

    @Query(name = "getScheduleFormat", nativeQuery = true)
    String getFormat(Integer movie_id, String schedule_date, Integer cinema_id);

    @Query(name = "getScheduleTimeByFilm", nativeQuery = true)
    List<ResponseScheduleTime>  getScheduleTimeByFilm(Integer movie_id, String schedule_date, Integer cinema_id);

    @Query(name = "showSchedule", nativeQuery = true)
    List<ResponseScheduleCinema>  getSchedule(Integer movie_id, String schedule_date);



    @Query(value = "SELECT  s.schedule_id, s.movie_id, s.room_id, s.schedule_date, s.schedule_start AS schedule_start,s.schedule_end FROM Schedule s WHERE s.movie_id = ?1", nativeQuery = true)
    List<Schedule> getScheduleByMovieId(Integer movieId);
//test
@Transactional
@Modifying
@Query(value = "SELECT " +
        "    m.movie_name AS movieName, " +
        "    c.cinema_name AS cinemaName, " +
        "    r.room_name AS roomName, " +
        "    s.schedule_date AS scheduleDate, " +
        "    s.schedule_start AS scheduleStart, " +
        "    s.schedule_end AS scheduleEnd " +
        "FROM " +
        "    Schedule s " +
        "INNER JOIN " +
        "    Movies m ON s.movie_id = m.movie_id " +
        "INNER JOIN " +
        "    Room r ON s.room_id = r.room_id " +
        "INNER JOIN " +
        "    Cinemas c ON r.cinema_id = c.cinema_id " +
        "WHERE " +
        "    s.schedule_id = :scheduleId ", nativeQuery = true)

List<Object[]> getScheduleDetailsByScheduleId(@Param("scheduleId") Integer scheduleId);


    @Query(value = "SELECT s.schedule_id AS schedule_id," +
            "       m.movie_id AS movie_id," +
            "       r.room_id AS room_id," +
            "       c.cinema_id AS cinema_id " +
            "FROM schedule s " +
            "JOIN room r ON s.room_id = r.room_id " +
            "JOIN cinemas c ON r.cinema_id = c.cinema_id " +
            "WHERE c.cinema_id = :cinemaId", nativeQuery = true)
    List<Schedule> findByCinemaId(@Param("cinemaId") int cinemaId);

    @Query(value = "SELECT s.schedule_date As scheduleDate, s.schedule_start As scheduleStart,m.movie_id As movieId," +
            " m.movie_name As movieName, m.movie_poster AS moviePoster, m.movie_cens AS movieCens," +
            " c.cinema_name AS cinemaName, c.cinema_address AS cinemaAddress, s.schedule_id As scheduleId " +
            "FROM schedule s " +
            "JOIN movies m ON s.movie_id = m.movie_id " +
            "JOIN room r ON s.room_id = r.room_id " +
            "JOIN cinemas c ON r.cinema_id = c.cinema_id " +
            "WHERE c.cinema_id = :cinemaId", nativeQuery = true)
    List<Object[]> findDetailedByCinemaId(@Param("cinemaId") int cinemaId);

    //movieID
    @Query(value = "SELECT s.schedule_date AS scheduleDate, s.schedule_start AS scheduleStart, " +
            " m.movie_id as movieId,m.movie_name AS movieName, m.movie_poster AS moviePoster, " +
            "m.movie_cens AS movieCens, c.cinema_name AS cinemaName, c.cinema_address AS cinemaAddress ,s.schedule_id As scheduleId , c.cinema_id AS cinemaId " +
            "FROM schedule s " +
            "JOIN movies m ON s.movie_id = m.movie_id " +
            "JOIN room r ON s.room_id = r.room_id " +
            "JOIN cinemas c ON r.cinema_id = c.cinema_id " +
            "WHERE m.movie_id = :movieId", nativeQuery = true)
    List<Object[]> findDetailedByMovieId(@Param("movieId") int movieId);
//admin

};