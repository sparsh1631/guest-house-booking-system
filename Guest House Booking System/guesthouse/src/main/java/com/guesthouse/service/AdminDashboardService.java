package com.guesthouse.service;

import com.guesthouse.dto.DashboardStatsDTO;

public interface AdminDashboardService {
    DashboardStatsDTO getDashboardStats();
    Object getRevenueStats(String startDate, String endDate);
    Object getOccupancyStats(String startDate, String endDate);
} 