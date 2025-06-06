package com.guesthouse.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private Long totalGuestHouses = 0L;
    private Long totalRooms = 0L;
    private Long totalBeds = 0L;
    private Long availableRooms = 0L;
    private Long occupiedRooms = 0L;
    private Long totalBookings = 0L;
    private Long pendingRequests = 0L;
    private Long totalUsers = 0L;
    private Double totalRevenue = 0.0;
} 