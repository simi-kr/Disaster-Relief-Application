package com.college.disasterrelief.config;

import com.college.disasterrelief.model.Admin;
import com.college.disasterrelief.model.User;
import com.college.disasterrelief.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.seed.admin-email}")
    private String seedAdminEmail;

    @Value("${app.seed.admin-password}")
    private String seedAdminPassword;

    @Override
    public void run(String... args) {
        if (userRepository.existsByEmail(seedAdminEmail)) {
            return;
        }

        User admin = new Admin();
        admin.setName("System Admin");
        admin.setEmail(seedAdminEmail);
        admin.setPasswordHash(passwordEncoder.encode(seedAdminPassword));
        admin.setPhone("0000000000");
        admin.setLocation("HQ");
        userRepository.save(admin);

        log.info("Seeded default admin account: {}", seedAdminEmail);
    }
}
