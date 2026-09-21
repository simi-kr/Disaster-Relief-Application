package com.college.disasterrelief.service;

import com.college.disasterrelief.dto.auth.AuthResponse;
import com.college.disasterrelief.dto.auth.LoginRequest;
import com.college.disasterrelief.dto.auth.RegisterRequest;
import com.college.disasterrelief.exception.EmailAlreadyExistsException;
import com.college.disasterrelief.model.*;
import com.college.disasterrelief.repository.UserRepository;
import com.college.disasterrelief.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyExistsException(request.email());
        }

        User user = newUserForRole(request);
        user.setName(request.name());
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setPhone(request.phone());
        user.setLocation(request.location());

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved);
        return new AuthResponse(token, saved.getId(), saved.getName(), saved.getEmail(), saved.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalStateException("User disappeared after authentication"));

        String token = jwtService.generateToken(user);
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole());
    }

    /** Abstraction/polymorphism: builds the correct User subclass for the requested role. */
    private User newUserForRole(RegisterRequest request) {
        return switch (request.role()) {
            case ADMIN -> new Admin();
            case CITIZEN -> new Citizen();
            case VOLUNTEER -> new Volunteer();
            case RESCUE_TEAM -> new RescueTeamMember();
        };
    }
}
