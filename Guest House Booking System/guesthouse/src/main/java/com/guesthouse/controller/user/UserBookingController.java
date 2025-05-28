package com.guesthouse.controller.user;

import com.guesthouse.dto.BookingDTO;
import com.guesthouse.dto.BookingRequestDTO;
import com.guesthouse.model.enums1.BookingStatus;
import com.guesthouse.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/bookings")
@RequiredArgsConstructor
public class UserBookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingDTO> bookRoom(@Valid @RequestBody BookingRequestDTO bookingRequestDTO) {
        BookingDTO created = bookingService.createBooking(bookingRequestDTO);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingDTO> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam BookingStatus status
    ) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(bookingId, status));
    }

    @GetMapping("/filter")
    public ResponseEntity<List<BookingDTO>> getBookingsByStatus(@RequestParam BookingStatus status) {
        return ResponseEntity.ok(bookingService.getBookingsByStatus(status));
    }
}