package com.guesthouse.controller.admin;

import com.guesthouse.dto.BookingResponseDTO;
import com.guesthouse.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/bookings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AdminBookingController {

    private final AdminService adminService;

    @GetMapping
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {
        return ResponseEntity.ok(adminService.getAllBookings());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<BookingResponseDTO>> getPendingBookings() {
        return ResponseEntity.ok(adminService.getPendingBookings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> getBookingById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getBookingById(id));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<BookingResponseDTO> approveBooking(
            @PathVariable Long id,
            @RequestParam(required = false) String notes
    ) {
        return ResponseEntity.ok(adminService.approveBooking(id, notes));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<BookingResponseDTO> rejectBooking(
            @PathVariable Long id,
            @RequestParam String reason
    ) {
        return ResponseEntity.ok(adminService.rejectBooking(id, reason));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingResponseDTO> cancelBooking(
            @PathVariable Long id,
            @RequestParam String reason
    ) {
        return ResponseEntity.ok(adminService.cancelBooking(id, reason));
    }

    @GetMapping("/guest-house/{guestHouseId}")
    public ResponseEntity<List<BookingResponseDTO>> getBookingsByGuestHouse(
            @PathVariable Long guestHouseId
    ) {
        return ResponseEntity.ok(adminService.getBookingsByGuestHouse(guestHouseId));
    }
}