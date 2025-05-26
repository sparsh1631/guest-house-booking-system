package com.guesthouse.controller.admin;

import com.guesthouse.dto.GuestHouseDTO;
import com.guesthouse.dto.RoomDTO;
import com.guesthouse.dto.BedDTO;
import com.guesthouse.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for admin operations on guest houses, rooms, and beds
 */
@RestController
@RequestMapping("/api/admin/guest-houses")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')") // Requires ADMIN role for all endpoints
public class AdminGuestHouseController {

    private final AdminService adminService;

    // Guest House Endpoints

    @PostMapping
    public ResponseEntity<GuestHouseDTO> createGuestHouse(
            @Valid @RequestBody GuestHouseDTO guestHouseDTO) {
        GuestHouseDTO createdGuestHouse = adminService.createGuestHouse(guestHouseDTO);
        return new ResponseEntity<>(createdGuestHouse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GuestHouseDTO> updateGuestHouse(
            @PathVariable Long id,
            @Valid @RequestBody GuestHouseDTO guestHouseDTO) {
        GuestHouseDTO updatedGuestHouse = adminService.updateGuestHouse(id, guestHouseDTO);
        return ResponseEntity.ok(updatedGuestHouse);
    }

    @GetMapping
    public ResponseEntity<List<GuestHouseDTO>> getAllGuestHouses() {
        List<GuestHouseDTO> guestHouses = adminService.getAllGuestHouses();
        return ResponseEntity.ok(guestHouses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GuestHouseDTO> getGuestHouseById(@PathVariable Long id) {
        GuestHouseDTO guestHouse = adminService.getGuestHouseById(id);
        return ResponseEntity.ok(guestHouse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGuestHouse(@PathVariable Long id) {
        adminService.deleteGuestHouse(id);
        return ResponseEntity.noContent().build();
    }

    // Room Endpoints

    @PostMapping("/rooms")
    public ResponseEntity<RoomDTO> addRoomToGuestHouse(
            @Valid @RequestBody RoomDTO roomDTO) {
        RoomDTO createdRoom = adminService.addRoomToGuestHouse(roomDTO);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    @PutMapping("/rooms/{id}")
    public ResponseEntity<RoomDTO> updateRoom(
            @PathVariable Long id,
            @Valid @RequestBody RoomDTO roomDTO) {
        RoomDTO updatedRoom = adminService.updateRoom(id, roomDTO);
        return ResponseEntity.ok(updatedRoom);
    }

    @GetMapping("/{guestHouseId}/rooms")
    public ResponseEntity<List<RoomDTO>> getRoomsByGuestHouse(
            @PathVariable Long guestHouseId) {
        List<RoomDTO> rooms = adminService.getRoomsByGuestHouse(guestHouseId);
        return ResponseEntity.ok(rooms);
    }

    @DeleteMapping("/rooms/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id) {
        adminService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }

    // Bed Endpoints

    @PostMapping("/beds")
    public ResponseEntity<BedDTO> addBedToRoom(
            @Valid @RequestBody BedDTO bedDTO) {
        BedDTO createdBed = adminService.addBedToRoom(bedDTO);
        return new ResponseEntity<>(createdBed, HttpStatus.CREATED);
    }

    @PutMapping("/beds/{id}")
    public ResponseEntity<BedDTO> updateBed(
            @PathVariable Long id,
            @Valid @RequestBody BedDTO bedDTO) {
        BedDTO updatedBed = adminService.updateBed(id, bedDTO);
        return ResponseEntity.ok(updatedBed);
    }

    @GetMapping("/rooms/{roomId}/beds")
    public ResponseEntity<List<BedDTO>> getBedsByRoom(
            @PathVariable Long roomId) {
        List<BedDTO> beds = adminService.getBedsByRoom(roomId);
        return ResponseEntity.ok(beds);
    }

    @DeleteMapping("/beds/{id}")
    public ResponseEntity<Void> deleteBed(@PathVariable Long id) {
        adminService.deleteBed(id);
        return ResponseEntity.noContent().build();
    }
}