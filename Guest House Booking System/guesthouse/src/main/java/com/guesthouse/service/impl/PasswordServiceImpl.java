package com.guesthouse.service.impl;

import com.guesthouse.dto.ForgotPasswordRequestDTO;
import com.guesthouse.dto.ResetPasswordRequestDTO;
import com.guesthouse.model.entity.PasswordResetToken;
import com.guesthouse.model.entity.User;
import com.guesthouse.repository.PasswordResetTokenRepository;
import com.guesthouse.repository.UserRepository;
import com.guesthouse.service.PasswordService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordServiceImpl implements PasswordService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public PasswordServiceImpl(
            UserRepository userRepository,
            PasswordResetTokenRepository tokenRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String processForgotPassword(ForgotPasswordRequestDTO request) {  // Changed return type
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found with email: " + request.getEmail());
        }

        User user = userOpt.get();
        tokenRepository.deleteByUser(user);  // remove existing token if any

        String token = UUID.randomUUID().toString(); //This securely generates unique tokens for password resets.
        PasswordResetToken resetToken = PasswordResetToken.builder()
                .user(user)
                .token(token)
                .expirationTime(LocalDateTime.now().plusMinutes(30))
                .build();
        tokenRepository.save(resetToken); //Stores the token in your database with expiration time.

        return token;  // Return the generated token
    }

    @Override
    @Transactional
    public void resetPassword(ResetPasswordRequestDTO request) {
        PasswordResetToken token = tokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new RuntimeException("Invalid or expired token"));

        if (token.getExpirationTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired"); //Critical security check to prevent stale tokens from being used.
        }

        User user = token.getUser();
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        tokenRepository.delete(token); // delete token after successful reset
    }
}