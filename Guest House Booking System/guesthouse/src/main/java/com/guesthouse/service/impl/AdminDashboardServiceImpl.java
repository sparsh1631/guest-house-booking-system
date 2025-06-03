package com.guesthouse.service.impl;

import com.guesthouse.dto.DashboardStatsDTO;
import com.guesthouse.model.enums1.BookingStatus;
import com.guesthouse.model.enums1.RoomStatus;
import com.guesthouse.service.AdminDashboardService;
import com.guesthouse.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminDashboardServiceImpl implements AdminDashboardService {

    private final GuestHouseRepository guestHouseRepository;
    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;

    @Autowired
    public AdminDashboardServiceImpl(
            GuestHouseRepository guestHouseRepository,
            RoomRepository roomRepository,
            BookingRepository bookingRepository,
            UserRepository userRepository) {
        this.guestHouseRepository = guestHouseRepository;
        this.roomRepository = roomRepository;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsDTO getDashboardStats() {
        long pendingRequests = bookingRepository.countByStatus(BookingStatus.PENDING);
        double totalRevenue = bookingRepository.sumTotalRevenue(BookingStatus.COMPLETED);

        DashboardStatsDTO stats = new DashboardStatsDTO();
        stats.setTotalGuestHouses(guestHouseRepository.count());
        stats.setTotalRooms(roomRepository.count());
        stats.setTotalBeds(roomRepository.sumTotalBeds());
        stats.setAvailableRooms(roomRepository.countByStatus(RoomStatus.AVAILABLE));
        stats.setOccupiedRooms(roomRepository.countByStatus(RoomStatus.OCCUPIED));
        stats.setTotalBookings(bookingRepository.count());
        stats.setPendingRequests(pendingRequests);
        stats.setTotalRevenue(totalRevenue);
        stats.setTotalUsers(userRepository.count());
        return stats;
    }

    @Override
    public Object getRevenueStats(String startDate, String endDate) {
        // Implement revenue statistics logic
        return null;
    }

    @Override
    public Object getOccupancyStats(String startDate, String endDate) {
        // Implement occupancy statistics logic
        return null;
    }
} 