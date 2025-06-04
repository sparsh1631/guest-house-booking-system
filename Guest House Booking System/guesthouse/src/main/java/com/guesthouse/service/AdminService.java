package com.guesthouse.service;

import com.guesthouse.dto.*;
import com.guesthouse.model.enums1.BookingStatus;

import java.util.List;

public interface AdminService {

    // Guest House CRUD
    GuestHouseDTO createGuestHouse(GuestHouseDTO guestHouseDTO);
    GuestHouseDTO updateGuestHouse(Long id, GuestHouseDTO guestHouseDTO);
    List<GuestHouseDTO> getAllGuestHouses();
    GuestHouseDTO getGuestHouseById(Long id);
    void deleteGuestHouse(Long id);

    // Room Management
    List<RoomDTO> getAllRooms();
    RoomDTO getRoomById(Long id);
    RoomDTO addRoomToGuestHouse(RoomDTO roomDTO);
    RoomDTO updateRoom(Long id, RoomDTO roomDTO);
    List<RoomDTO> getRoomsByGuestHouse(Long guestHouseId);
    void deleteRoom(Long id);

    // Bed Management
    BedDTO addBedToRoom(BedDTO bedDTO);
    BedDTO updateBed(Long id, BedDTO bedDTO);
    List<BedDTO> getBedsByRoom(Long roomId);
    void deleteBed(Long id);

    // ✅ Booking Management for Admin
    List<BookingResponseDTO> getAllBookings();
    List<BookingResponseDTO> getPendingBookings();
    BookingResponseDTO getBookingById(Long id);
    BookingResponseDTO approveBooking(Long id, String notes);
    BookingResponseDTO rejectBooking(Long id, String reason);
    BookingResponseDTO cancelBooking(Long id, String reason);
    List<BookingResponseDTO> getBookingsByGuestHouse(Long guestHouseId);

    // New methods for guest houses with rooms
    List<GuestHouseWithRoomsDTO> getAllGuestHousesWithRooms();
    GuestHouseWithRoomsDTO getGuestHouseWithRooms(Long id);
}
