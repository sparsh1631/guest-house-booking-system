package com.guesthouse.service;

import com.guesthouse.dto.BookingDTO;
import com.guesthouse.model.enums1.BookingStatus;

import java.util.List;

public interface BookingService {
    BookingDTO createBooking(BookingDTO bookingDTO);                    // User creates booking
    List<BookingDTO> getUserBookings(Long userId);                      // User views their own bookings
    List<BookingDTO> getBookingsByStatus(BookingStatus status);         // Admin filters bookings
    BookingDTO updateBookingStatus(Long bookingId, BookingStatus status); // Admin updates status
    List<BookingDTO> getBookingsByEmail(String email);
}
