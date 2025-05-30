package com.guesthouse.controller.user;

import com.guesthouse.dto.AuthResponseDTO;
import com.guesthouse.dto.UserLogin1DTO;
import com.guesthouse.dto.UserRegistration1DTO;
import com.guesthouse.service.AuthService1;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService1 authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody UserRegistration1DTO dto) {
        String result = authService.register(dto);
        AuthResponseDTO response = new AuthResponseDTO(result, ""); // Empty token for registration
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody UserLogin1DTO dto) {
        String token = authService.login(dto); // Assuming this returns the token
        AuthResponseDTO response = new AuthResponseDTO("Login successful", token);
        return ResponseEntity.ok(response);
    }
}