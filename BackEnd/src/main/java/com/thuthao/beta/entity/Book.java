package com.thuthao.beta.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "booking_id")
//    private int bookingId;
    private Integer bookingId;
    @Column(name = "user_id")
    private int userId;

    @Column(name = "schedule_id")
    private int scheduleId;

    @Column(name = "seat_id")
    private int seatId;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "seat_status")
    private int seatStatus;
    @Column(name = "booking_datetime")
//    private String  bookingDateTime;
    private LocalDate bookingDateTime;

    public Book() {
        this.bookingDateTime = LocalDate.now();
    }

    public Book(int userId, int scheduleId, int seatId, BigDecimal  price, int seatStatus) {
        this.userId = userId;
        this.scheduleId = scheduleId;
        this.seatId = seatId;
        this.price = price;
        this.seatStatus = seatStatus;

    }

//    public int getBookingId() {
//        return bookingId;
//    }
//
//    public void setBookingId(int bookingId) {
//        this.bookingId = bookingId;
//    }
public Integer getBookingId() {
    return bookingId;
}

    public void setBookingId(Integer bookingId) {
        this.bookingId = bookingId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public BigDecimal  getPrice() {
        return price;
    }

    public void setPrice(BigDecimal  price) {
        this.price = price;
    }

    public int getSeatStatus() {
        return seatStatus;
    }

    public void setSeatStatus(int seatStatus) {
        this.seatStatus = seatStatus;
    }

    public LocalDate getBookingDateTime() {
        return bookingDateTime;
    }

    public void setBookingDateTime(LocalDate bookingDateTime) {
        this.bookingDateTime = bookingDateTime;
    }
}