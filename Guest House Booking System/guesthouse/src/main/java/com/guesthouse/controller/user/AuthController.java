package com.guesthouse.controller.user;

import com.guesthouse.dto.AuthResponseDTO;
import com.guesthouse.dto.UserLogin1DTO;
import com.guesthouse.dto.UserRegistration1DTO;
import com.guesthouse.service.AuthService1;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
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
        String msg = authService.register(dto);
        return ResponseEntity.ok(new AuthResponseDTO(msg, null));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@Valid @RequestBody UserLogin1DTO dto) {
        try {
            String token = authService.login(dto);
            return ResponseEntity.ok()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + token) // Add token to header
                    .body(new AuthResponseDTO("Login Successful", token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponseDTO("Invalid credentials", null));
        }
    }
}