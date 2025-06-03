package com.guesthouse.controller.admin;

import com.guesthouse.dto.DashboardStatsDTO;
import com.guesthouse.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from your frontend
public class AdminDashboardController {

    private final AdminDashboardService dashboardService;

    @Autowired
    public AdminDashboardController(AdminDashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(dashboardService.getDashboardStats());
    }

    @GetMapping("/revenue-stats")
    public ResponseEntity<Object> getRevenueStats(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        return ResponseEntity.ok(dashboardService.getRevenueStats(startDate, endDate));
    }

    @GetMapping("/occupancy-stats")
    public ResponseEntity<Object> getOccupancyStats(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        return ResponseEntity.ok(dashboardService.getOccupancyStats(startDate, endDate));
    }
} 