package com.guesthouse.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private long totalGuestHouses;
    private long totalRooms;
    private long totalBeds;
    private long availableRooms;
    private long occupiedRooms;
    private long totalBookings;
    private long pendingRequests;
    private double totalRevenue;
    private long totalUsers;
} 