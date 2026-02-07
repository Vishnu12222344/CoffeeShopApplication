package com.CoffeShopApplication.Config;

import com.CoffeShopApplication.model.*;
import com.CoffeShopApplication.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final BaristaRepository baristaRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        // Create ROLE_ADMIN
        if (roleRepository.findByName("ROLE_ADMIN").isEmpty()) {
            Role adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");
            roleRepository.save(adminRole);
        }

        // Create default admin
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.getRoles().add(
                    roleRepository.findByName("ROLE_ADMIN").orElseThrow()
            );
            userRepository.save(admin);
        }

        // Create 3 baristas
        if (baristaRepository.count() == 0) {

            Barista b1 = new Barista();
            b1.setName("Barista-1");
            b1.setBusyUntil(LocalDateTime.now());

            Barista b2 = new Barista();
            b2.setName("Barista-2");
            b2.setBusyUntil(LocalDateTime.now());

            Barista b3 = new Barista();
            b3.setName("Barista-3");
            b3.setBusyUntil(LocalDateTime.now());

            baristaRepository.save(b1);
            baristaRepository.save(b2);
            baristaRepository.save(b3);
        }
    }
}
