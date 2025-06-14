package com.guesthouse.repository;

import com.guesthouse.model.entity.Booking;
import com.guesthouse.model.entity.Room;
import com.guesthouse.model.enums1.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Fetch bookings by user ID
    List<Booking> findByUserId(Long userId);

    // Filter bookings by status (used for admin or user views)
    List<Booking> findByStatus(BookingStatus status);

    //this method to find bookings where room is in the provided list
    List<Booking> findByRoomIn(List<Room> rooms);

    List<Booking> findByUserEmail(String email);

    // Count bookings by status
    long countByStatus(BookingStatus status);

    // Sum total revenue for completed bookings
    @Query("SELECT COALESCE(SUM(b.totalPrice), 0.0) FROM Booking b WHERE b.status = :status")
    Double sumTotalRevenue(@Param("status") BookingStatus status);

    // Convenience method that doesn't require a parameter
    default Long countPendingBookings() {
        return countByStatus(BookingStatus.PENDING);
    }
}
