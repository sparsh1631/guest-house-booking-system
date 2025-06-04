package com.guesthouse.controller;

import com.guesthouse.dto.GuestHouseWithRoomsDTO;
import com.guesthouse.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/guest-houses/with-rooms")
    public ResponseEntity<List<GuestHouseWithRoomsDTO>> getAllGuestHousesWithRooms() {
        List<GuestHouseWithRoomsDTO> guestHouses = adminService.getAllGuestHousesWithRooms();
        return ResponseEntity.ok(guestHouses);
    }

    @GetMapping("/guest-houses/{id}/with-rooms")
    public ResponseEntity<GuestHouseWithRoomsDTO> getGuestHouseWithRooms(@PathVariable Long id) {
        GuestHouseWithRoomsDTO guestHouse = adminService.getGuestHouseWithRooms(id);
        return ResponseEntity.ok(guestHouse);
    }
} 