package com.guesthouse.controller.user;

import com.guesthouse.dto.AuthResponseDTO;
import com.guesthouse.dto.UserLogin1DTO;
import com.guesthouse.dto.UserRegistration1DTO;
import com.guesthouse.model.entity.User;
import com.guesthouse.service.AuthService1;
import com.guesthouse.repository.UserRepository;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService1 authService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody UserRegistration1DTO dto) {
        String msg = authService.register(dto);
        return ResponseEntity.ok(new AuthResponseDTO(msg, null));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody UserLogin1DTO dto) {
        try {
            String token = authService.login(dto);
            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                    .body(new AuthResponseDTO("Login Successful", token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponseDTO("Invalid credentials", null));
        }
    }

    // 🔥 NEW ENDPOINT: Get role of the logged-in user
    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserRole(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        String email = authentication.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            String role = userOpt.get().getRole().name(); // e.g., ADMIN or USER
            return ResponseEntity.ok().body(new AuthResponseDTO("Role fetched", role));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
}
