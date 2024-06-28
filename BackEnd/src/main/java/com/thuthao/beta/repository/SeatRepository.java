package com.thuthao.beta.repository;

import com.thuthao.beta.entity.Seat;
import com.thuthao.beta.model.ResponseSeat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {
    Seat findBySeatId(Integer seat_id);

    List<Seat> findByRoomId(int roomId);
    //lấy ghế trống theo id film và id schedule
    @Query(name = "getSeatEmpty", nativeQuery = true)
    List<ResponseSeat> getSeatEmptyBySchedule(Integer schedule_id);

}
