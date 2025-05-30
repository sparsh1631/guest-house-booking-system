package com.guesthouse.controller.user;

import com.guesthouse.dto.GuestHouseDTO;
import com.guesthouse.dto.RoomDTO;
import com.guesthouse.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@PreAuthorize("hasAuthority('USER')")
@RestController
@RequestMapping("/api/user/guesthouses")
public class UserGuestHouseController {

    @Autowired
    private UserService userService;

    // Get all active guest houses
    @GetMapping
    public ResponseEntity<List<GuestHouseDTO>> getAllGuestHouses() {
        List<GuestHouseDTO> guestHouses = userService.getAllActiveGuestHouses();
        return ResponseEntity.ok(guestHouses);
    }

    // Get guest house details by ID
    @GetMapping("/{id}")
    public ResponseEntity<GuestHouseDTO> getGuestHouseById(@PathVariable Long id) {
        GuestHouseDTO guestHouse = userService.getGuestHouseById(id);
        return ResponseEntity.ok(guestHouse);
    }

    // Get rooms of a specific guest house
    @GetMapping("/{id}/rooms")
    public ResponseEntity<List<RoomDTO>> getRoomsByGuestHouse(@PathVariable Long id) {
        List<RoomDTO> rooms = userService.getRoomsByGuestHouse(id);
        return ResponseEntity.ok(rooms);
    }
}
