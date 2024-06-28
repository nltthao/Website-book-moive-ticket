package com.thuthao.beta.request;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class BookRequest {
    @NotNull(message = "Thiếu id suất chiếu")
    private int scheduleId;
    @NotNull(message = "Thiếu id seat")
//    private int seatId;
    private List<Integer> seatIds;
    @NotNull(message = "Thiếu giá ghế")
    private double price;
    @NotNull(message = "Thiếu trạng thái ghế")
    private int seatStatus;
    @NotNull(message = "ngày đặt")
    private LocalDate bookingDateTime;

    public BookRequest() {
        this.bookingDateTime = LocalDate.now();
    }



    public BookRequest(int scheduleId, List<Integer> seatIds, double price, int seatStatus, LocalDate bookingDateTime) {
        this.scheduleId = scheduleId;
        this.seatIds = seatIds;
        this.price = price;
        this.seatStatus = seatStatus;
        this.bookingDateTime = bookingDateTime;
    }

    public LocalDate getBookingDateTime() {
        return bookingDateTime;
    }

    public void setBookingDateTime(LocalDate bookingDateTime) {
        this.bookingDateTime = bookingDateTime;
    }

    public int getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
    }


    public List<Integer> getSeatIds() {
        return seatIds;
    }

    public void setSeatIds(List<Integer> seatIds) {
        this.seatIds = seatIds;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getSeatStatus() {
        return seatStatus;
    }

    public void setSeatStatus(int seatStatus) {
        this.seatStatus = seatStatus;
    }
}
