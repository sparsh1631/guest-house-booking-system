package com.guesthouse.service.impl;

import com.guesthouse.dto.GuestHouseDTO;
import com.guesthouse.dto.RoomDTO;
import com.guesthouse.model.entity.GuestHouse;
import com.guesthouse.model.entity.Room;
import com.guesthouse.repository.GuestHouseRepository;
import com.guesthouse.repository.RoomRepository;
import com.guesthouse.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private GuestHouseRepository guestHouseRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<GuestHouseDTO> getAllActiveGuestHouses() {
        List<GuestHouse> guestHouses = guestHouseRepository.findByIsActive(true);
        return guestHouses.stream()
                .map(gh -> modelMapper.map(gh, GuestHouseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public GuestHouseDTO getGuestHouseById(Long guestHouseId) {
        GuestHouse guestHouse = guestHouseRepository.findById(guestHouseId)
                .orElseThrow(() -> new RuntimeException("GuestHouse not found with id: " + guestHouseId));
        return modelMapper.map(guestHouse, GuestHouseDTO.class);
    }

    @Override
    public List<RoomDTO> getRoomsByGuestHouse(Long guestHouseId) {
        List<Room> rooms = roomRepository.findByGuestHouseId(guestHouseId);
        return rooms.stream()
                .map(room -> {
                    RoomDTO dto = modelMapper.map(room, RoomDTO.class);
                    // Set guestHouseId manually since Room entity has guestHouseobject
                    dto.setGuestHouseId(room.getGuestHouse().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
