package com.guesthouse.service;

import com.guesthouse.dto.BookingDTO;
import com.guesthouse.dto.BookingRequestDTO;
import com.guesthouse.model.enums1.BookingStatus;

import java.util.List;

public interface BookingService {
    BookingDTO createBooking(BookingRequestDTO bookingRequestDTO);
    List<BookingDTO> getUserBookings(Long userId);
    List<BookingDTO> getBookingsByStatus(BookingStatus status);
    BookingDTO updateBookingStatus(Long bookingId, BookingStatus status);
}