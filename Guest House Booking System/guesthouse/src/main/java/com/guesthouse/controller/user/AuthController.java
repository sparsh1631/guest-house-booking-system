package com.guesthouse.controller.user;

import com.guesthouse.dto.AuthResponseDTO;
import com.guesthouse.dto.UserLogin1DTO;
import com.guesthouse.dto.UserRegistration1DTO;
import com.guesthouse.service.AuthService1;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    public AuthResponseDTO register(@Valid @RequestBody UserRegistration1DTO dto) {
        String msg = authService.register(dto);
        return new AuthResponseDTO(msg, null);
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@Valid @RequestBody UserLogin1DTO dto) {
        String token = authService.login(dto);
        return new AuthResponseDTO("Login Successful", token);
    }
}
