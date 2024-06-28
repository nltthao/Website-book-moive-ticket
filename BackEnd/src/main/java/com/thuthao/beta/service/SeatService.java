package com.thuthao.beta.service;

import com.thuthao.beta.entity.Seat;
import com.thuthao.beta.model.ResponseData;
import com.thuthao.beta.repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {
    @Autowired
    SeatRepository seatRepository;
  //thử
    public int getSeatCount(int roomId) {
        List<Seat> seats = seatRepository.findByRoomId(roomId);
        return seats.size();
    }

    public ResponseData<Seat> getAllSeat(){
        return new ResponseData(HttpStatus.OK, "success", seatRepository.findAll());
    }
    public ResponseData<Integer> getSeatEmpty(Integer schedule_id){

        if(seatRepository.getSeatEmptyBySchedule(schedule_id).size() == 0){
            return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
        }else{
            return new ResponseData(HttpStatus.OK, "success", seatRepository.getSeatEmptyBySchedule(schedule_id));
        }
    }
}
