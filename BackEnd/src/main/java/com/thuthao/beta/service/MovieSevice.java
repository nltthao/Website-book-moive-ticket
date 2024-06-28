package com.thuthao.beta.service;

import com.thuthao.beta.entity.Movie;
import com.thuthao.beta.model.ResponseData;
import com.thuthao.beta.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
public class MovieSevice {
    @Autowired
    MovieRepository movieRepository;

    public List<Movie> listAll(String keyword) {
        if (keyword == null || keyword.isEmpty()) {
            return movieRepository.findAll();
        }
        return movieRepository.search(keyword);
    }

    public Movie addMovie(Movie movie) {
        return movieRepository.save(movie);
    }

public void deleteMovie(Integer movie_id) {
    movieRepository.deleteById(movie_id);
}
    public Movie updateMovie(Movie movie) {
        Movie existingMovie = movieRepository.findById(movie.getMovieId()).get();
        existingMovie.setMovieName(movie.getMovieName());
        existingMovie.setMovieDescription(movie.getMovieDescription());
        existingMovie.setMovieTrailer(movie.getMovieTrailer());
        existingMovie.setMovieCens(movie.getMovieCens());
        existingMovie.setMovieGenres(movie.getMovieGenres());
        existingMovie.setMovieRelease(movie.getMovieRelease());
        existingMovie.setMovieLength(movie.getMovieLength());
        existingMovie.setMovieFormat(movie.getMovieFormat());
        existingMovie.setMoviePoster(movie.getMoviePoster());

        Movie updatedMovie = movieRepository.save(existingMovie);
        return updatedMovie;
    }

    public ResponseData<Movie> getAllMovie(){
        return new ResponseData(HttpStatus.OK, "success", movieRepository.findAll());
    }

    public ResponseData<Movie> getMoviesNow(){
        List<Movie> rs = movieRepository.getMoviesNow();
        if(CollectionUtils.isEmpty(rs)){
            return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
        }else{
            return new ResponseData(HttpStatus.OK, "success",rs);
        }
    }

    public ResponseData<Movie> getMoviesFuture(){
        List<Movie> rs = movieRepository.getMoviesFuture();
        if(CollectionUtils.isEmpty(rs)){
            return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
        }else{
            return new ResponseData(HttpStatus.OK, "success", rs);
        }
    }
}
