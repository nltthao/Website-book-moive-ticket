package com.thuthao.beta.repository;

import com.thuthao.beta.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
    Room findByRoomId(int roomId);
    List<Room> findByCinemaId(int cinemaId);
}
