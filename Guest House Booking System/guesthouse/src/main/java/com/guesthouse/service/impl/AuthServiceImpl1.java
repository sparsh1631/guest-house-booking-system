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
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.guesthouse.model.enums1.Role;  // Add this import
@Service
public class AuthServiceImpl1 implements AuthService1 {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public String register(UserRegistration1DTO dto) {
        // Check if user already exists
        if (userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Email already registered.");
        }

        // Create new user
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword())); // Encode password
        user.setRole(Role.valueOf(dto.getRole().toUpperCase())); // Convert to enum

        // Save user
        userRepository.save(user);
        return "User registered successfully!";
    }

    @Override
    public String login(UserLogin1DTO dto) {
        try {
            // Authenticate user credentials
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            dto.getEmail(),
                            dto.getPassword()
                    )
            );

            // Load user details
            final UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getEmail());

            // Generate JWT token
            return jwtUtil.generateToken(userDetails.getUsername());

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid email or password");
        }
    }
}