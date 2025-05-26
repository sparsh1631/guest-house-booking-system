package com.guesthouse.service;

import com.guesthouse.dto.ForgotPasswordRequestDTO;
import com.guesthouse.dto.ResetPasswordRequestDTO;

public interface PasswordService {
    String processForgotPassword(ForgotPasswordRequestDTO request);  // Changed to String
    void resetPassword(ResetPasswordRequestDTO request);
}