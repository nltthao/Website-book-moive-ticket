package com.thuthao.beta.repository;

import com.thuthao.beta.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    List<Book> findByScheduleId(int scheduleId);
    @Query("SELECT b FROM Book b WHERE b.scheduleId = :roomId AND b.bookingDateTime >= :startDate AND b.bookingDateTime <= :endDate")
    List<Book> findByScheduleIdAndBookingDates(@Param("roomId") int roomId, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    @Query("SELECT b FROM Book b WHERE b.bookingId = :bookingId")
    List<Book> findByBookId(Integer bookingId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE `booking` SET `seat_status`= '1' WHERE `user_id`= ?1 AND `booking_id`= ?2", nativeQuery = true)
    Integer updateStatus(Integer user_id, Integer booking_id);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO `booking`(`user_id`, `schedule_id`, `seat_id`, `price`, `seat_status`,`booking_datetime`) VALUES (?1, ?2, ?3, ?4, 1,CURRENT_TIMESTAMP)", nativeQuery = true)
    Integer bookTicket(Integer user_id, Integer schedule_id, Integer seat_id, Double price, Integer seat_status);
//    @Transactional
////    @Modifying
//    @Query(value = "UPDATE `booking` SET `seat_status`= '1' WHERE `user_id`= ?1 AND `booking_id`= ?2", nativeQuery = true)
//    Integer updateStatus(Integer user_id, Integer booking_id);
//    @Modifying
//    @Query("UPDATE Book s SET s.seatStatus = 1 WHERE s.seatId = :seatId AND s.userId = :userId")
//    int updateStatus(@Param("userId") Integer userId, @Param("seatId") Integer seatId);

//    @Transactional
//    @Modifying
//    @Query(value = "INSERT INTO `booking`(`user_id`, `schedule_id`, `seat_id`, `price`, `seat_status`) VALUES (?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
//    Integer bookTicket(Integer user_id, Integer schedule_id, Integer seat_id, Double price, Integer seat_status);


//    @Transactional
//    @Modifying
//@Query(value = "INSERT INTO `booking`(`user_id`, `schedule_id`, `seat_id`, `price`, `seat_status`,`booking_datetime`) VALUES (?1, ?2, ?3, ?4, 1,?6);", nativeQuery = true)
//Integer bookTicket(Integer user_id, Integer schedule_id, Integer seat_id, Double price, Integer seat_status, String booking_datetime);


    @Modifying
    @Query(value = "SELECT LAST_INSERT_ID()", nativeQuery = true)
    Integer getLastInsertId();


    @Transactional
    @Modifying
    @Query(value = "SELECT m.movie_name,m.movie_poster, c.cinema_name, r.room_name, b.booking_datetime, CONCAT(se.seat_row, se.seat_number) AS seat_name " +
            "FROM movies m " +
            "JOIN schedule s ON m.movie_id = s.movie_id " +
            "JOIN room r ON s.room_id = r.room_id " +
            "JOIN cinemas c ON r.cinema_id = c.cinema_id " +
            "JOIN booking b ON s.schedule_id = b.schedule_id " +
            "JOIN seats se ON b.seat_id = se.seat_id " +
            "JOIN users u ON b.user_id = u.user_id " + // Tham gia bảng người dùng để lấy thông tin về user
            "WHERE u.username = :username " + // Thêm điều kiện lọc theo username
            "ORDER BY b.booking_datetime DESC", nativeQuery = true)
    List<Object[]> getBookingHistory(@Param("username") String username);


// doanh thu cua tung rap
//@Query("SELECT c.cinemaName, SUM(b.price) AS totalRevenue " +
//        "FROM Book b " +
//        "JOIN Schedule s ON b.scheduleId = s.scheduleId " +
//        "JOIN Room r ON s.roomId = r.roomId " +
//        "JOIN Cinema c ON r.cinemaId = c.cinemaId " +
//        "WHERE b.bookingDateTime BETWEEN :startDate AND :endDate " +
//        "GROUP BY c.cinemaName")
//List<Object[]> getRevenueByCinema(
//        @Param("startDate") LocalDate startDate,
//        @Param("endDate") LocalDate endDate);
@Query(value ="SELECT c.cinema_name, DATE(b.booking_datetime) AS bookingDate, SUM(b.price) AS totalRevenue " +
        "FROM booking b " +
        "JOIN schedule s ON b.schedule_id = s.schedule_id " +
        "JOIN room r ON s.room_id = r.room_id " +
        "JOIN cinemas c ON r.cinema_id = c.cinema_id " +
        "WHERE b.booking_datetime BETWEEN :startDate AND :endDate " +
        "GROUP BY c.cinema_name, DATE(b.booking_datetime) " +
        "ORDER BY c.cinema_name, bookingDate",
        nativeQuery = true)
List<Object[]> getDailyRevenueByCinema(
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate);

// tính phan tram doanh thu cua tung rap
//    @Query(value = "SELECT c.cinema_name AS cinemaName, " +
//            "SUM(b.price) AS totalRevenue, " +
//            "(SUM(b.price) / :totalAllCinemas) * 100 AS revenuePercentage " +
//            "FROM booking b " +
//            "JOIN schedule s ON b.schedule_id = s.schedule_id " +
//            "JOIN room r ON s.room_id = r.room_id " +
//            "JOIN cinemas c ON r.cinema_id = c.cinema_id " +
//            "WHERE b.booking_datetime BETWEEN :startDate AND :endDate " +
//            "GROUP BY c.cinema_name",
//            nativeQuery = true)
//    List<Object[]> getCinemaRevenue(
//            @Param("startDate") LocalDate startDate,
//            @Param("endDate") LocalDate endDate,
//            @Param("totalAllCinemas") BigDecimal totalAllCinemas);
//
//    @Query(value = "SELECT SUM(b.price) " +
//            "FROM Book b " +
//            "JOIN Schedule s ON b.scheduleId = s.scheduleId " +
//            "WHERE b.bookingDateTime BETWEEN :startDate AND :endDate")
//    BigDecimal getTotalRevenue(
//            @Param("startDate") LocalDate startDate,
//            @Param("endDate") LocalDate endDate);
// tong doanh thu all(ok)
@Query(value = "SELECT SUM(total_revenue) AS total_all_cinemas " +
        "FROM ( " +
        "    SELECT SUM(b.price) AS total_revenue " +
        "    FROM booking b " +
        "    JOIN schedule s ON b.schedule_id = s.schedule_id " +
        "    JOIN room r ON s.room_id = r.room_id " +
        "    JOIN cinemas c ON r.cinema_id = c.cinema_id " +
        "    WHERE b.booking_datetime " +
        "    GROUP BY c.cinema_name " +
        ") AS subquery",
        nativeQuery = true)
BigDecimal getTotalAllCinemasRevenue();
}
