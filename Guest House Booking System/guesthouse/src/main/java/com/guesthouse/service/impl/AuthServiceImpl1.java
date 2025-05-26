package com.guesthouse.service.impl;

import com.guesthouse.config.JwtUtil;
import com.guesthouse.dto.UserLogin1DTO;
import com.guesthouse.dto.UserRegistration1DTO;
import com.guesthouse.exception.UserAlreadyExistsException;
import com.guesthouse.model.entity.User;
import com.guesthouse.repository.UserRepository;
import com.guesthouse.service.AuthService1;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl1 implements AuthService1 {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public String register(UserRegistration1DTO dto) {
        // Check if user already exists by email
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already registered.");
        }


        // Create and save newuser
        User user = new User();
        user.setUsername(dto.getUsername()); // changed here
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        // Convert role String to enum (case-insensitive)
        try {
            user.setRole(com.guesthouse.model.enums1.Role.valueOf(dto.getRole().toUpperCase()));
        } catch (IllegalArgumentException e) {
            return "Error: Invalid role provided.";
        }

        userRepository.save(user);

        return "Registration successful!";
    }

    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public String login(UserLogin1DTO dto) {
        // 1. Authenticate the user via Spring Security
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword())
        );

        // 2. If successful, generate token
        return jwtUtil.generateToken(dto.getEmail());
    }

}


