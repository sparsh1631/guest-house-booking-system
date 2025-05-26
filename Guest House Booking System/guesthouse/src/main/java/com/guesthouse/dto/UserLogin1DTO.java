package com.guesthouse.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserLogin1DTO {

    @Email
    @NotBlank
    private String email;            // Private field to store the user's email

    @NotBlank
    private String password;        // Private field to store the user's password



}
