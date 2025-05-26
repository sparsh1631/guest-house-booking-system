package com.guesthouse.service;

import com.guesthouse.dto.UserLogin1DTO;
import com.guesthouse.dto.UserRegistration1DTO;

public interface AuthService1 {
    String register(UserRegistration1DTO dto);
    String login(UserLogin1DTO dto);
}
