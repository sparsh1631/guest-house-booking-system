package com.guesthouse.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NotBlank
public class LoginRequestDTO {
    private String email;
    private String password;
}
