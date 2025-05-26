package com.guesthouse.service.impl;

import com.guesthouse.dto.*;
import com.guesthouse.model.entity.*;
import com.guesthouse.model.enums1.BedStatus;
import com.guesthouse.repository.*;
import com.guesthouse.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Implementation of AdminService containing business logic
 * for managing guest houses, rooms, and beds
 */
@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final GuestHouseRepository guestHouseRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final ModelMapper modelMapper;

    // Guest House Operations

    @Override
    @Transactional
    public GuestHouseDTO createGuestHouse(GuestHouseDTO guestHouseDTO) {
        // Map DTO to Entity
        GuestHouse guestHouse = modelMapper.map(guestHouseDTO, GuestHouse.class);

        // Set default active status if not provided
        if (guestHouse.getIsActive() == null) {
            guestHouse.setIsActive(true);
        }

        // Save to database
        GuestHouse savedGuestHouse = guestHouseRepository.save(guestHouse);

        // Return mapped DTO
        return modelMapper.map(savedGuestHouse, GuestHouseDTO.class);
    }

    @Override
    @Transactional
    public GuestHouseDTO updateGuestHouse(Long id, GuestHouseDTO guestHouseDTO) {
        // Find existing guest house
        GuestHouse existingGuestHouse = guestHouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Guest house not found"));

        // Map updated fields from DTO to existing entity
        modelMapper.map(guestHouseDTO, existingGuestHouse);

        // Save updates
        GuestHouse updatedGuestHouse = guestHouseRepository.save(existingGuestHouse);

        return modelMapper.map(updatedGuestHouse, GuestHouseDTO.class);
    }

    @Override
    public List<GuestHouseDTO> getAllGuestHouses() {
        // Retrieve all guest houses and map to DTOs
        return guestHouseRepository.findAll().stream()
                .map(gh -> modelMapper.map(gh, GuestHouseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public GuestHouseDTO getGuestHouseById(Long id) {
        // Find guest house by ID or throw exception
        GuestHouse guestHouse = guestHouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Guest house not found"));

        return modelMapper.map(guestHouse, GuestHouseDTO.class);
    }

    @Override
    @Transactional
    public void deleteGuestHouse(Long id) {
        // Verify existence then delete
        GuestHouse guestHouse = guestHouseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Guest house not found"));

        guestHouseRepository.delete(guestHouse);
    }

    // Room Operations

    @Override
    @Transactional
    public RoomDTO addRoomToGuestHouse(RoomDTO roomDTO) {
        // Verify guest house exists
        GuestHouse guestHouse = guestHouseRepository.findById(roomDTO.getGuestHouseId())
                .orElseThrow(() -> new RuntimeException("Guest house not found"));

        // Map DTO to Entity and set relationship
        Room room = modelMapper.map(roomDTO, Room.class);
        room.setGuestHouse(guestHouse);

        // Save and return DTO
        Room savedRoom = roomRepository.save(room);
        return modelMapper.map(savedRoom, RoomDTO.class);
    }

    @Override
    @Transactional
    public RoomDTO updateRoom(Long id, RoomDTO roomDTO) {
        // Find existing room
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Map updated fields
        modelMapper.map(roomDTO, existingRoom);

        // Save updates
        Room updatedRoom = roomRepository.save(existingRoom);
        return modelMapper.map(updatedRoom, RoomDTO.class);
    }

    @Override
    public List<RoomDTO> getRoomsByGuestHouse(Long guestHouseId) {
        // Get all rooms for guest house and map to DTOs
        return roomRepository.findByGuestHouseId(guestHouseId).stream()
                .map(room -> modelMapper.map(room, RoomDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteRoom(Long id) {
        // Verify existence then delete
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found"));
        roomRepository.delete(room);
    }

    // Bed Operations

    @Override
    @Transactional
    public BedDTO addBedToRoom(BedDTO bedDTO) {
        // Verify room exists
        Room room = roomRepository.findById(bedDTO.getRoomId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        // Map DTO to Entity, set relationship and status
        Bed bed = modelMapper.map(bedDTO, Bed.class);
        bed.setRoom(room);
        bed.setStatus(BedStatus.valueOf(bedDTO.getStatus()));

        // Save and return DTO
        Bed savedBed = bedRepository.save(bed);
        return modelMapper.map(savedBed, BedDTO.class);
    }

    @Override
    @Transactional
    public BedDTO updateBed(Long id, BedDTO bedDTO) {
        // Find existing bed
        Bed existingBed = bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        // Map updated fields and status
        modelMapper.map(bedDTO, existingBed);
        existingBed.setStatus(BedStatus.valueOf(bedDTO.getStatus()));

        // Save updates
        Bed updatedBed = bedRepository.save(existingBed);
        return modelMapper.map(updatedBed, BedDTO.class);
    }

    @Override
    public List<BedDTO> getBedsByRoom(Long roomId) {
        // Get all beds for room and map to DTOs
        return bedRepository.findByRoomId(roomId).stream()
                .map(bed -> modelMapper.map(bed, BedDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteBed(Long id) {
        // Verify existence then delete
        Bed bed = bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found"));
        bedRepository.delete(bed);
    }
}