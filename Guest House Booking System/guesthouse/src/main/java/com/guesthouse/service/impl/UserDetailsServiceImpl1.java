package com.guesthouse.service.impl;

import com.guesthouse.model.entity.User;
import com.guesthouse.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserDetailsServiceImpl1 implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Find user by email or throw exception
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // Convert role to authority (without ROLE_ prefix)
        String authority = user.getRole().name();

        // Return Spring Security UserDetails object
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),          // username
                user.getPassword(),      // encoded password
                Collections.singleton(new SimpleGrantedAuthority(authority)) // authorities
        );
    }
}