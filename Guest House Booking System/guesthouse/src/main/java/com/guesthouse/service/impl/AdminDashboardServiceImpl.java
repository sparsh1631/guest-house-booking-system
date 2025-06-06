package com.guesthouse.service.impl;

import com.guesthouse.dto.DashboardStatsDTO;
import com.guesthouse.model.enums1.BookingStatus;
import com.guesthouse.model.enums1.RoomStatus;
import com.guesthouse.repository.*;
import com.guesthouse.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;

@Service
@Transactional(readOnly = true)
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final GuestHouseRepository guestHouseRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Autowired
    public AdminDashboardServiceImpl(
            GuestHouseRepository guestHouseRepository,
            RoomRepository roomRepository,
            BedRepository bedRepository,
            BookingRepository bookingRepository,
            UserRepository userRepository) {
        this.guestHouseRepository = guestHouseRepository;
        this.roomRepository = roomRepository;
        this.bedRepository = bedRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    @Override
    public DashboardStatsDTO getDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        
        // Get total guest houses
        stats.setTotalGuestHouses(guestHouseRepository.count());
        
        // Get room statistics
        stats.setTotalRooms(roomRepository.count());
        stats.setTotalBeds(roomRepository.sumTotalBeds());
        stats.setAvailableRooms(roomRepository.countByStatus(RoomStatus.AVAILABLE));
        stats.setOccupiedRooms(roomRepository.countByStatus(RoomStatus.OCCUPIED));
        
        // Get booking statistics
        stats.setTotalBookings(bookingRepository.countActiveBookings());
        stats.setPendingRequests(bookingRepository.countPendingBookings());
        
        // Get active users count
        stats.setTotalUsers(userRepository.countByActiveTrue());
        
        // Get total revenue from completed bookings
        stats.setTotalRevenue(bookingRepository.sumTotalRevenue(BookingStatus.COMPLETED));
        
        return stats;
    }

    @Override
    public Map<String, Object> getRevenueStats(LocalDate startDate, LocalDate endDate) {
        Map<String, Object> stats = new HashMap<>();
        
        if (startDate == null) {
            startDate = LocalDate.now().minusMonths(1);
        }
        if (endDate == null) {
            endDate = LocalDate.now();
        }

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

        Double totalRevenue = bookingRepository.sumTotalAmountBetween(startDateTime, endDateTime);
        Long totalBookings = bookingRepository.countByCheckInDateBetween(startDateTime, endDateTime);
        Double averageRevenuePerBooking = totalBookings > 0 ? totalRevenue / totalBookings : 0.0;

        stats.put("totalRevenue", totalRevenue);
        stats.put("totalBookings", totalBookings);
        stats.put("averageRevenuePerBooking", averageRevenuePerBooking);
        stats.put("startDate", startDate);
        stats.put("endDate", endDate);

        return stats;
    }

    @Override
    public Map<String, Object> getOccupancyStats(LocalDate startDate, LocalDate endDate) {
        Map<String, Object> stats = new HashMap<>();
        
        if (startDate == null) {
            startDate = LocalDate.now().minusMonths(1);
        }
        if (endDate == null) {
            endDate = LocalDate.now();
        }

        LocalDateTime startDateTime = startDate.atStartOfDay();
        LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

        Long totalRooms = roomRepository.count();
        Long occupiedRooms = roomRepository.countByStatus(RoomStatus.OCCUPIED);
        Double occupancyRate = totalRooms > 0 ? (double) occupiedRooms / totalRooms * 100 : 0.0;
        Long totalBookingsInPeriod = bookingRepository.countByCheckInDateBetween(startDateTime, endDateTime);

        stats.put("totalRooms", totalRooms);
        stats.put("occupiedRooms", occupiedRooms);
        stats.put("occupancyRate", occupancyRate);
        stats.put("totalBookingsInPeriod", totalBookingsInPeriod);
        stats.put("startDate", startDate);
        stats.put("endDate", endDate);

        return stats;
    }
} 