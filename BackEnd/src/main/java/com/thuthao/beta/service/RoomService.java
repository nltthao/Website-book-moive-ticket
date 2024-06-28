package com.thuthao.beta.service;

import com.thuthao.beta.entity.Movie;
import com.thuthao.beta.entity.Room;
import com.thuthao.beta.model.ResponseData;
import com.thuthao.beta.repository.CinemaRepository;
import com.thuthao.beta.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    @Autowired
    RoomRepository roomRepository;
    public ResponseData<Room> getAllRoom(){
        return new ResponseData(HttpStatus.OK, "success", roomRepository.findAll());
    }
}
