package com.guesthouse.service;

import com.guesthouse.dto.GuestHouseDTO;
import com.guesthouse.dto.RoomDTO;
import com.guesthouse.dto.BedDTO;
import java.util.List;

/**
 * AdminService is an interface that defines all the operations
 * an admin can perform in the Guest House Booking System.
 *
 * It handles:
 * - Guest House management
 * - Room management
 * - Bed management
 */

public interface AdminService {
    // Guest House CRUD
    GuestHouseDTO createGuestHouse(GuestHouseDTO guestHouseDTO);
    GuestHouseDTO updateGuestHouse(Long id, GuestHouseDTO guestHouseDTO);
    List<GuestHouseDTO> getAllGuestHouses();
    GuestHouseDTO getGuestHouseById(Long id);
    void deleteGuestHouse(Long id);

    // Room Management
    RoomDTO addRoomToGuestHouse(RoomDTO roomDTO);
    RoomDTO updateRoom(Long id, RoomDTO roomDTO);
    List<RoomDTO> getRoomsByGuestHouse(Long guestHouseId);
    void deleteRoom(Long id);

    // Bed Management
    BedDTO addBedToRoom(BedDTO bedDTO);
    BedDTO updateBed(Long id, BedDTO bedDTO);
    List<BedDTO> getBedsByRoom(Long roomId);
    void deleteBed(Long id);
}