package com.thuthao.beta.service;

import com.thuthao.beta.entity.Book;
import com.thuthao.beta.entity.Cinema;
import com.thuthao.beta.entity.Room;
import com.thuthao.beta.model.ResponseData;
import com.thuthao.beta.repository.*;
import com.thuthao.beta.repository.*;
import com.thuthao.beta.request.BookRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.HashMap;
@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    UserRepository userRepository;
    @Autowired
    SeatRepository seatRepository;
    @Autowired
    RoomRepository roomRepository;
    @Autowired
    CinemaRepository cinemaRepository;

    public ResponseData<Book> bookTicket(Authentication authentication, BookRequest bookRequest) {
        Integer userId = userRepository.findIdByUsername(authentication.getName());
        if (bookRequest == null) {
            return new ResponseData(HttpStatus.FOUND, "book ticket fail", null);
        } else {
            bookRequest.setBookingDateTime(LocalDate.now());
            List<Integer> seatIds = bookRequest.getSeatIds();
//            return new ResponseData(HttpStatus.OK, "success", bookRepository.bookTicket(userId, bookRequest.getScheduleId(), seatIds, bookRequest.getPrice(), bookRequest.getSeatStatus()));
            if (seatIds != null) { // Kiểm tra xem seatIds có khác null hay không
                for (Integer seatId : seatIds) {
                    bookRepository.bookTicket(userId, bookRequest.getScheduleId(), seatId, bookRequest.getPrice(), bookRequest.getSeatStatus());

                }
            }
            return new ResponseData(HttpStatus.OK, "success", null);

        }
    }

    public ResponseData<Integer> updateStatus(Authentication authentication, Integer book_id) {
        Integer userId = userRepository.findIdByUsername(authentication.getName());
        Double point = userRepository.getPoint(userId);
        userRepository.addPoint(point + 10, userId);
        return new ResponseData(HttpStatus.OK, "book running", bookRepository.updateStatus(userId, book_id));
    }


    public List<Book> getBookedSeatsByBookId(Integer bookId) {
        return bookRepository.findByBookId(bookId);
    }

    //bản hiện tại
    public ResponseData<?> confirmTick(Authentication authentication, Integer bookId) {
        List<Book> bookedSeats = getBookedSeatsByBookId(bookId);

        try {
            for (Book bookedSeat : bookedSeats) {
                Integer userId = bookedSeat.getUserId();
                Integer bookingId = bookedSeat.getBookingId();

                Integer updatedRows = bookRepository.updateStatus(userId, bookingId);
                if (updatedRows > 0) {
                    Double point = userRepository.getPoint(userId);
                    userRepository.addPoint(point + 10, userId);
                } else {
                    throw new Exception("Không thể cập nhật trạng thái ghế");
                }
            }
            return new ResponseData<>(HttpStatus.OK, "Thay đổi trạng thái ghế thành công", null);
        } catch (Exception e) {
            return new ResponseData<>(HttpStatus.INTERNAL_SERVER_ERROR, "Lỗi khi cập nhật trạng thái ghế", null);
        }
    }

    public List<Object[]> getBookingHistory(String username) {

        return bookRepository.getBookingHistory(username);
    }



    // thong ke
    public BigDecimal getTotalAllCinemasRevenue() {
        return bookRepository.getTotalAllCinemasRevenue();
    }

    //%
    public Map<String, BigDecimal> calculateCinemasRevenuePercentage(LocalDate startDate, LocalDate endDate) {
        List<Room> rooms = roomRepository.findAll();

        // Tính tổng doanh thu của tất cả các rạp
        Map<Integer, BigDecimal> cinemaTotalRevenueMap = rooms.stream()
                .collect(Collectors.groupingBy(Room::getCinemaId,
                        Collectors.mapping(Room::getRoomId,
                                Collectors.reducing(BigDecimal.ZERO,
                                        roomId -> calculateRoomRevenue(roomId, startDate, endDate),
                                        BigDecimal::add))));

        BigDecimal totalRevenueAllCinemas = cinemaTotalRevenueMap.values().stream()
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Tính phần trăm doanh thu của từng rạp
        Map<String, BigDecimal> cinemaPercentageRevenueMap = new HashMap<>();
        cinemaTotalRevenueMap.forEach((cinemaId, cinemaRevenue) -> {
            BigDecimal percentageRevenue = BigDecimal.ZERO;
            if (totalRevenueAllCinemas.compareTo(BigDecimal.ZERO) > 0) {
                percentageRevenue = cinemaRevenue.divide(totalRevenueAllCinemas, 4, RoundingMode.HALF_UP)
                        .multiply(BigDecimal.valueOf(100));
            }
            Cinema cinema = cinemaRepository.findById(cinemaId).orElse(null);
            if (cinema != null) {
                cinemaPercentageRevenueMap.put(cinema.getCinemaName(), percentageRevenue);
            }
        });

        return cinemaPercentageRevenueMap;
    }

    private BigDecimal calculateRoomRevenue(int roomId, LocalDate startDate, LocalDate endDate) {
        List<Book> roomBookings = bookRepository.findByScheduleIdAndBookingDates(roomId, startDate, endDate);
        return roomBookings.stream()
                .map(Book::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }


    public List<Object[]> getDailyRevenueByCinema(LocalDate startDate, LocalDate endDate) {
        return bookRepository.getDailyRevenueByCinema(startDate, endDate);
    }
}