package com.thuthao.beta.entity;

import com.thuthao.beta.model.ResponseSeat;

import javax.persistence.*;

@SqlResultSetMappings(value = {
        @SqlResultSetMapping(
                name = "ResponseSeatEmpty",
                classes = @ConstructorResult(
                        targetClass = ResponseSeat.class,
                        columns = {
                                @ColumnResult(name = "row"),
                                @ColumnResult(name = "seats", type = String.class)
                        }
                )
        )
})

@NamedNativeQuery(name = "getSeatEmpty", resultSetMapping = "ResponseSeatEmpty",
        query = "SELECT d.seat_row as row, CONCAT('[', GROUP_CONCAT(JSON_OBJECT('seat_id', d.seat_id, 'seat_type', d.seat_type, 'number', d.seat_number, 'seat_status', d.seat_status) SEPARATOR ','), ']') seats " +
                "FROM (SELECT `seats`.`seat_id`, `seats`.`seat_type`,`seats`.`seat_row`, `seats`.`seat_number`, `booking`.`seat_status` " +
                "FROM `schedule`, `seats` LEFT JOIN `booking` ON `seats`.`seat_id` = `booking`.`seat_id`" +
                " WHERE `schedule`.`room_id` = `seats`.`room_id` AND `schedule`.`schedule_id` = ?1) d " +
                "GROUP BY d.seat_row")
@Entity
@Table(name = "seats")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "seat_id")
    private Integer seatId;

    @Column(name = "seat_type")
    private String seatType;

    @Column(name = "room_id")
    private int roomId;

    @Column(name = "seat_row")
    private String seatRow;

    @Column(name = "seat_number")
    private int seatNumber;

    public Seat() {
    }

    public Seat(String seatType, int roomId, String seatRow, int seatNumber) {
        this.seatType = seatType;
        this.roomId = roomId;
        this.seatRow = seatRow;
        this.seatNumber = seatNumber;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public String getSeatType() {
        return seatType;
    }

    public void setSeatType(String seatType) {
        this.seatType = seatType;
    }

    public int getRoomId() {
        return roomId;
    }

    public void setRoomId(int roomId) {
        this.roomId = roomId;
    }

    public String getSeatRow() {
        return seatRow;
    }

    public void setSeatRow(String seatRow) {
        this.seatRow = seatRow;
    }

    public int getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(int seatNumber) {
        this.seatNumber = seatNumber;
    }
}
