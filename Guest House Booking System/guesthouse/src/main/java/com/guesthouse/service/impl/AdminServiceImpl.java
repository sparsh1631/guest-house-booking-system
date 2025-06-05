package com.guesthouse.service.impl;

import com.guesthouse.dto.*;
import com.guesthouse.model.entity.*;
import com.guesthouse.model.enums1.BedStatus;
import com.guesthouse.model.enums1.BedType;
import com.guesthouse.model.enums1.BookingStatus;
import com.guesthouse.model.enums1.RoomStatus;
import com.guesthouse.repository.*;
import com.guesthouse.service.AdminService;
import com.guesthouse.exception.ResourceNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    private final GuestHouseRepository guestHouseRepository;
    private final RoomRepository roomRepository;
    private final BedRepository bedRepository;
    private final BookingRepository bookingRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public AdminServiceImpl(
            GuestHouseRepository guestHouseRepository,
            RoomRepository roomRepository,
            BedRepository bedRepository,
            BookingRepository bookingRepository,
            ModelMapper modelMapper) {
        this.guestHouseRepository = guestHouseRepository;
        this.roomRepository = roomRepository;
        this.bedRepository = bedRepository;
        this.bookingRepository = bookingRepository;
        this.modelMapper = modelMapper;
    }

    // Guest House Operations
    @Override
    @Transactional
    public GuestHouseDTO createGuestHouse(GuestHouseDTO guestHouseDTO) {
        GuestHouse guestHouse = modelMapper.map(guestHouseDTO, GuestHouse.class);
        if (guestHouse.getIsActive() == null) {
            guestHouse.setIsActive(true);
        }
        GuestHouse savedGuestHouse = guestHouseRepository.save(guestHouse);
        return modelMapper.map(savedGuestHouse, GuestHouseDTO.class);
    }

    @Override
    @Transactional
    public GuestHouseDTO updateGuestHouse(Long id, GuestHouseDTO guestHouseDTO) {
        GuestHouse existingGuestHouse = guestHouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest house not found"));
        modelMapper.map(guestHouseDTO, existingGuestHouse);
        GuestHouse updatedGuestHouse = guestHouseRepository.save(existingGuestHouse);
        return modelMapper.map(updatedGuestHouse, GuestHouseDTO.class);
    }

    @Override
    public List<GuestHouseDTO> getAllGuestHouses() {
        return guestHouseRepository.findAll().stream()
                .map(gh -> modelMapper.map(gh, GuestHouseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public GuestHouseDTO getGuestHouseById(Long id) {
        GuestHouse guestHouse = guestHouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest house not found"));
        return modelMapper.map(guestHouse, GuestHouseDTO.class);
    }

    @Override
    @Transactional
    public void deleteGuestHouse(Long id) {
        GuestHouse guestHouse = guestHouseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Guest house not found"));
        guestHouseRepository.delete(guestHouse);
    }

    @Override
    public List<GuestHouseWithRoomsDTO> getAllGuestHousesWithRooms() {
        List<GuestHouse> guestHouses = guestHouseRepository.findAll();
        return guestHouses.stream()
                .map(guestHouse -> {
                    GuestHouseWithRoomsDTO dto = modelMapper.map(guestHouse, GuestHouseWithRoomsDTO.class);
                    List<Room> rooms = roomRepository.findByGuestHouseId(guestHouse.getId());
                    dto.setRooms(rooms.stream()
                            .map(room -> modelMapper.map(room, RoomDTO.class))
                            .collect(Collectors.toList()));
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public GuestHouseWithRoomsDTO getGuestHouseWithRooms(Long id) {
        GuestHouse guestHouse = guestHouseRepository.findById(id)
                .orElseThrow(() -> new  ResourceNotFoundException("Guest House not found"));
        
        GuestHouseWithRoomsDTO dto = modelMapper.map(guestHouse, GuestHouseWithRoomsDTO.class);
        List<Room> rooms = roomRepository.findByGuestHouseId(id);
        dto.setRooms(rooms.stream()
                .map(room -> modelMapper.map(room, RoomDTO.class))
                .collect(Collectors.toList()));
        return dto;
    }

    // Room Operations
    @Override
    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(room -> {
                    RoomDTO dto = new RoomDTO();
                    dto.setId(room.getId());
                    dto.setRoomNumber(room.getRoomNumber());
                    dto.setType(room.getType());
                    dto.setPrice(room.getPrice());
                    dto.setStatus(room.getStatus().toString());
                    dto.setGuestHouseId(room.getGuestHouse().getId());
                    
                    // Map beds
                    if (room.getBeds() != null) {
                        List<BedDTO> bedDTOs = room.getBeds().stream()
                            .map(bed -> {
                                BedDTO bedDTO = new BedDTO();
                                bedDTO.setId(bed.getId());
                                bedDTO.setType(bed.getType().toString());
                                bedDTO.setCount(bed.getCount());
                                bedDTO.setStatus(bed.getStatus().toString());
                                return bedDTO;
                            })
                            .collect(Collectors.toList());
                        dto.setBeds(bedDTOs);
                    }
                    
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));
        RoomDTO dto = modelMapper.map(room, RoomDTO.class);
        dto.setGuestHouseId(room.getGuestHouse().getId());
        return dto;
    }

    @Override
    @Transactional
    public RoomDTO addRoomToGuestHouse(RoomDTO roomDTO) {
        GuestHouse guestHouse = guestHouseRepository.findById(roomDTO.getGuestHouseId())
                .orElseThrow(() -> new ResourceNotFoundException("Guest house not found"));
        Room room = new Room();
        room.setRoomNumber(roomDTO.getRoomNumber());
        room.setType(roomDTO.getType());
        room.setPrice(roomDTO.getPrice());
        room.setStatus(RoomStatus.valueOf(roomDTO.getStatus()));
        room.setGuestHouse(guestHouse);
        Room savedRoom = roomRepository.save(room);

        // Handle beds
        if (roomDTO.getBeds() != null) {
            for (BedDTO bedDTO : roomDTO.getBeds()) {
                Bed bed = new Bed();
                bed.setType(BedType.valueOf(bedDTO.getType()));
                bed.setCount(bedDTO.getCount());
                bed.setStatus(BedStatus.AVAILABLE);
                bed.setRoom(savedRoom);
                bedRepository.save(bed);
            }
        }

        return getRoomById(savedRoom.getId()); // Return full room details
    }

    @Override
    @Transactional
    public RoomDTO updateRoom(Long id, RoomDTO roomDTO) {
        Room existingRoom = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        
        // Update basic room information
        existingRoom.setRoomNumber(roomDTO.getRoomNumber());
        existingRoom.setType(roomDTO.getType());
        existingRoom.setPrice(roomDTO.getPrice());
        existingRoom.setStatus(RoomStatus.valueOf(roomDTO.getStatus()));

        // Update guest house if changed
        if (!existingRoom.getGuestHouse().getId().equals(roomDTO.getGuestHouseId())) {
            GuestHouse newGuestHouse = guestHouseRepository.findById(roomDTO.getGuestHouseId())
                    .orElseThrow(() -> new ResourceNotFoundException("Guest house not found"));
            existingRoom.setGuestHouse(newGuestHouse);
        }

        // Handle beds
        if (roomDTO.getBeds() != null) {
            // Remove existing beds
            bedRepository.deleteAll(existingRoom.getBeds());
            existingRoom.getBeds().clear();

            // Add new beds
            for (BedDTO bedDTO : roomDTO.getBeds()) {
                Bed bed = new Bed();
                bed.setType(BedType.valueOf(bedDTO.getType()));
                bed.setCount(bedDTO.getCount());
                bed.setStatus(BedStatus.AVAILABLE);
                bed.setRoom(existingRoom);
                existingRoom.addBed(bed);
            }
        }

        Room updatedRoom = roomRepository.save(existingRoom);
        return getRoomById(updatedRoom.getId()); // Return full room details
    }

    @Override
    public List<RoomDTO> getRoomsByGuestHouse(Long guestHouseId) {
        return roomRepository.findByGuestHouseId(guestHouseId).stream()
                .map(room -> modelMapper.map(room, RoomDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteRoom(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        roomRepository.delete(room);
    }

    // Bed Operations
    @Override
    @Transactional
    public BedDTO addBedToRoom(BedDTO bedDTO) {
        Room room = roomRepository.findById(bedDTO.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        Bed bed = modelMapper.map(bedDTO, Bed.class);
        bed.setRoom(room);
        bed.setStatus(BedStatus.valueOf(bedDTO.getStatus()));
        Bed savedBed = bedRepository.save(bed);
        return modelMapper.map(savedBed, BedDTO.class);
    }

    @Override
    @Transactional
    public BedDTO updateBed(Long id, BedDTO bedDTO) {
        Bed existingBed = bedRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bed not found"));
        modelMapper.map(bedDTO, existingBed);
        existingBed.setStatus(BedStatus.valueOf(bedDTO.getStatus()));
        Bed updatedBed = bedRepository.save(existingBed);
        return modelMapper.map(updatedBed, BedDTO.class);
    }

    @Override
    public List<BedDTO> getBedsByRoom(Long roomId) {
        return bedRepository.findByRoomId(roomId).stream()
                .map(bed -> modelMapper.map(bed, BedDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteBed(Long id) {
        Bed bed = bedRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Bed not found"));
        bedRepository.delete(bed);
    }

    // Booking Management
    @Override
    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(booking -> modelMapper.map(booking, BookingResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingResponseDTO> getPendingBookings() {
        return bookingRepository.findByStatus(BookingStatus.PENDING).stream()
                .map(booking -> modelMapper.map(booking, BookingResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponseDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        return modelMapper.map(booking, BookingResponseDTO.class);
    }

    @Override
    @Transactional
    public BookingResponseDTO approveBooking(Long id, String notes) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        booking.setStatus(BookingStatus.APPROVED);
        // removed booking.setAdminNote(...)
        return modelMapper.map(bookingRepository.save(booking), BookingResponseDTO.class);
    }

    @Override
    @Transactional
    public BookingResponseDTO rejectBooking(Long id, String reason) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        booking.setStatus(BookingStatus.REJECTED);
        // removed booking.setAdminNote(...)
        return modelMapper.map(bookingRepository.save(booking), BookingResponseDTO.class);
    }

    @Override
    @Transactional
    public BookingResponseDTO cancelBooking(Long id, String reason) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));
        booking.setStatus(BookingStatus.CANCELLED);
        // removed booking.setAdminNote(...)
        return modelMapper.map(bookingRepository.save(booking), BookingResponseDTO.class);
    }

    @Override
    public List<BookingResponseDTO> getBookingsByGuestHouse(Long guestHouseId) {
        List<Room> rooms = roomRepository.findByGuestHouseId(guestHouseId);
        return bookingRepository.findByRoomIn(rooms).stream()
                .map(booking -> modelMapper.map(booking, BookingResponseDTO.class))
                .collect(Collectors.toList());
    }
}
