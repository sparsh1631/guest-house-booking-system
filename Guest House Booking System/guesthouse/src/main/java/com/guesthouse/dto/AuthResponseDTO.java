package com.guesthouse.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDTO {
    // This field stores a message like "Login successful" or "User registered"
    private String message;

    // Getter and Setter for 'token' — allows other classes to set the token value
    // This field stores the JWT token (or any session token) used for authenticated requests
    private String token;

    public AuthResponseDTO(String message, String token) {
        this.message = message;
        this.token = token;
    }
}
