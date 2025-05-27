package com.guesthouse.service.impl;

import com.guesthouse.dto.BookingDTO;
import com.guesthouse.exception.ResourceNotFoundException;
import com.guesthouse.model.entity.Booking;
import com.guesthouse.model.entity.Room;
import com.guesthouse.model.entity.User;
import com.guesthouse.model.enums1.BookingStatus;
import com.guesthouse.repository.BookingRepository;
import com.guesthouse.repository.RoomRepository;
import com.guesthouse.repository.UserRepository;
import com.guesthouse.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        // Fetch room and user for foreign key mapping
        Room room = roomRepository.findById(bookingDTO.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        User user = userRepository.findById(bookingDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Convert DTO to entity
        Booking booking = modelMapper.map(bookingDTO, Booking.class);
        booking.setRoom(room);
        booking.setUser(user);
        booking.setStatus(BookingStatus.PENDING); // Default status

        Booking savedBooking = bookingRepository.save(booking);
        return modelMapper.map(savedBooking, BookingDTO.class);
    }

    @Override
    public List<BookingDTO> getUserBookings(Long userId) {
        List<Booking> bookings = bookingRepository.findByUserId(userId);
        return bookings.stream()
                .map(b -> modelMapper.map(b, BookingDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<BookingDTO> getBookingsByStatus(BookingStatus status) {
        List<Booking> bookings = bookingRepository.findByStatus(status);
        return bookings.stream()
                .map(b -> modelMapper.map(b, BookingDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public BookingDTO updateBookingStatus(Long bookingId, BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found"));

        booking.setStatus(status);
        Booking updated = bookingRepository.save(booking);
        return modelMapper.map(updated, BookingDTO.class);
    }
}
