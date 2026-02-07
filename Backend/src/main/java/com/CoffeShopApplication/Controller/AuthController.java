package com.CoffeShopApplication.Controller;

import com.CoffeShopApplication.Repository.RoleRepository;
import com.CoffeShopApplication.Repository.UserRepository;
import com.CoffeShopApplication.Security.JwtService;
import com.CoffeShopApplication.dto.AuthRequest;
import com.CoffeShopApplication.dto.AuthResponse;
import com.CoffeShopApplication.model.Role;
import com.CoffeShopApplication.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest request) {

        // Check if username already exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // Default role for new users - you can make this configurable
        Role role = roleRepository.findByName("ROLE_USER")
                .orElseGet(() -> {
                    // If ROLE_USER doesn't exist, try ROLE_ADMIN
                    return roleRepository.findByName("ROLE_ADMIN")
                            .orElseThrow(() -> new RuntimeException("Default role not found"));
                });

        user.getRoles().add(role);
        userRepository.save(user);

        // Generate token for auto-login after registration
        String token = jwtService.generateToken(user.getUsername());

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElse(null);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        String token = jwtService.generateToken(user.getUsername());

        return ResponseEntity.ok(new AuthResponse(token));
    }
}