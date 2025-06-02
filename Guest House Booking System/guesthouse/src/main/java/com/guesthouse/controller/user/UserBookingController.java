package com.guesthouse.controller.user;

import com.guesthouse.dto.BookingDTO;
import com.guesthouse.model.enums1.BookingStatus;
import com.guesthouse.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/bookings")
@RequiredArgsConstructor
public class UserBookingController {

    private final BookingService bookingService;

    // 🔹 User books a room
    @PostMapping
    public ResponseEntity<BookingDTO> bookRoom(@RequestBody BookingDTO bookingDTO) {
        BookingDTO created = bookingService.createBooking(bookingDTO);
        return ResponseEntity.ok(created);
    }

    // 🔹 User views their own bookings
    @GetMapping("/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsForUser(@PathVariable Long userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    // 🔹 Admin updates booking status
    @PutMapping("/{bookingId}/status")
    public ResponseEntity<BookingDTO> updateBookingStatus(
            @PathVariable Long bookingId,
            @RequestParam BookingStatus status
    ) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(bookingId, status));
    }

    // 🔹 Admin filters bookings by status
    @GetMapping("/filter")
    public ResponseEntity<List<BookingDTO>> getBookingsByStatus(@RequestParam BookingStatus status) {
        return ResponseEntity.ok(bookingService.getBookingsByStatus(status));
    }

    @GetMapping("/my")
    public ResponseEntity<List<BookingDTO>> getMyBookings(@RequestParam String email) {
        List<BookingDTO> bookings = bookingService.getBookingsByEmail(email);
        return ResponseEntity.ok(bookings);
    }
}
