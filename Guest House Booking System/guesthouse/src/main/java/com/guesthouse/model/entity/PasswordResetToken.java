package com.guesthouse.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
    private String token;

    @OneToOne
    private User user;
    private LocalDateTime expirationTime;

    public PasswordResetToken(String token, User user, Date expiryDate) {
        this.token = token;
        this.user = user;
        this.expirationTime = expirationTime;
    }
}
