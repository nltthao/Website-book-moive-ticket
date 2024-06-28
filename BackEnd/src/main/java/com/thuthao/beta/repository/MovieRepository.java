package com.thuthao.beta.repository;

import com.thuthao.beta.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {

    Movie findByMovieId(Integer movie_id);
//    void deleteMovie(Integer movie_id);
    // get phim đang chiếu
    // SELECT * FROM `movies` WHERE `movie_release` = CURRENT_DATE OR `movie_release` < CURRENT_DATE
    @Query(value = "SELECT `movie_id`,`movie_name`,`movie_description`,`movie_trailer`,`movie_cens`,`movie_genres`,DATE_FORMAT(`movie_release`, \"%d/%m/%Y\") as `movie_release`,`movie_lenght`,`movie_format`,`movie_poster` FROM `movies` WHERE `movie_release` = CURRENT_DATE OR `movie_release` < CURRENT_DATE", nativeQuery = true)
    List<Movie> getMoviesNow();
    // get phim sắp chiếu
    // SELECT * FROM `movies` WHERE `movie_release` > CURRENT_DATE
    @Query(value = "SELECT `movie_id`,`movie_name`,`movie_description`,`movie_trailer`,`movie_cens`,`movie_genres`,DATE_FORMAT(`movie_release`, \"%d/%m/%Y\") as `movie_release`,`movie_lenght`,`movie_format`,`movie_poster` FROM `movies` WHERE `movie_release` > CURRENT_DATE", nativeQuery = true)
    List<Movie> getMoviesFuture();


    @Query("SELECT p FROM Movie p WHERE CONCAT(p.movieName, p.movieGenres, p.movieFormat, p.movieRelease) LIKE %?1%")
    public List<Movie> search(String keyword);
}
