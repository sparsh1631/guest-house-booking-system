package com.guesthouse.dto;

import com.guesthouse.model.enums1.BookingStatus;
import lombok.Data;

import java.time.LocalDate;

/**
 * This DTO is used to return booking details in a readable format,
 * especially useful for user or admin-facing APIs.
 */
@Data
public class BookingResponseDTO {
    private Long bookingId;          // Unique ID of the booking
    private String roomNumber;       // Room number for easy identification
    private String roomType;         // Type of room (Single/Double etc.)
    private Double roomPrice;        // Price of the room per day

    private String guestHouseName;   // Name of the guest house where room is booked

    private Long userId;             // ID of the user who made the booking
    private String userName;         // Name of the user

    private LocalDate checkInDate;   // Start date of stay
    private LocalDate checkOutDate;  // End date of stay

    private BookingStatus status;    // Current booking status

    private String note;             // Optional note added during booking
}
