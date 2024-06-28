package com.thuthao.beta.repository;

import com.thuthao.beta.entity.Cinema;
import com.thuthao.beta.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface CinemaRepository extends JpaRepository<Cinema, Integer> {
    Cinema findByCinemaId(Integer cinema_id);
    @Transactional
    @Modifying
    @Query(value = "SELECT `cinemas`.* FROM `cinemas`,`schedule`, `room` WHERE `schedule`.`room_id` = `room`.`room_id` AND `room`.`cinema_id`  = `cinemas`.`cinema_id` AND `schedule`.`schedule_id` = ?1", nativeQuery = true)
    Cinema getCinemasByIdSchedule(Integer schedule_id);
    @Transactional
    @Modifying
    @Query(nativeQuery = true, value = "SELECT `cinemas`.* FROM `cinemas`, `schedule`, `room` WHERE `schedule`.`room_id` = `room`.`room_id` AND `room`.`cinema_id` = `cinemas`.`cinema_id` AND `schedule`.`movie_id` = ?1 AND `schedule`.`schedule_date` = ?2")
    List<Cinema> getScheduleCinema(Integer movie_id, String schedule_date);

    @Transactional
    @Modifying
    @Query(value = "SELECT c.* FROM cinemas c INNER JOIN room r ON c.cinema_id = r.cinema_id INNER JOIN schedule s ON r.room_id = s.room_id WHERE s.movie_id = ?1", nativeQuery = true)
    List<Cinema> getCinemasByMovieId(Integer movieId);
//@Query(value = "SELECT DISTINCT c.* FROM cinemas c INNER JOIN room r ON c.cinema_id = r.cinema_id INNER JOIN schedule s ON r.room_id = s.room_id WHERE s.movie_id = ?1", nativeQuery = true)
//List<Cinema> getCinemasByMovieId(Integer movieId);
@Query("SELECT p FROM Cinema p WHERE CONCAT(p.cinemaName, p.cinemaAddress) LIKE %?1%")
public List<Cinema> search(String keyword);
}

