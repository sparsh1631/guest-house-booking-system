package com.guesthouse.service;

import com.guesthouse.dto.DashboardStatsDTO;
import java.time.LocalDate;
import java.util.Map;

public interface AdminDashboardService {
    DashboardStatsDTO getDashboardStats();
    Map<String, Object> getRevenueStats(LocalDate startDate, LocalDate endDate);
    Map<String, Object> getOccupancyStats(LocalDate startDate, LocalDate endDate);
} 