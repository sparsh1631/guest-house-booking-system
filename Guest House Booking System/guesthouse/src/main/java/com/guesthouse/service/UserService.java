package com.guesthouse.service;

import com.guesthouse.dto.GuestHouseDTO;
import com.guesthouse.dto.RoomDTO;

import java.util.List;

public interface UserService {
    List<GuestHouseDTO> getAllActiveGuestHouses();
    GuestHouseDTO getGuestHouseById(Long guestHouseId);
    List<RoomDTO> getRoomsByGuestHouse(Long guestHouseId);
}
