package com.management.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity httpSecurity,
                                                       BCryptPasswordEncoder bCryptPasswordEncoder,
                                                       UserDetailsService userDetailsService) throws Exception {
        return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(bCryptPasswordEncoder)
                .and().build();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Stateless session management
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS configuration
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/login").permitAll() // Allow login access
                        .requestMatchers(HttpMethod.GET, "/api/users").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/products").hasAnyAuthority("ADMIN", "CASHIER", "USER")
                        .requestMatchers(HttpMethod.GET, "/api/products/**").hasAnyAuthority("ADMIN", "CASHIER", "USER")
                        .requestMatchers(HttpMethod.GET, "/api/categories").hasAnyAuthority("ADMIN", "CASHIER", "USER")
                        .requestMatchers(HttpMethod.GET, "/api/categories/**").hasAnyAuthority("ADMIN", "CASHIER", "USER")
                        .requestMatchers(HttpMethod.POST, "/api/products/save").hasAuthority("CREATE")
                        .requestMatchers(HttpMethod.PUT, "/api/products/update").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/products/delete/**").hasAuthority("ADMIN")
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JWTAuthenticationFilter(authenticationManager), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build(); // Build and return the SecurityFilterChain
    }

    // CORS configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:4200")); // Frontend origin
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed methods
        configuration.setAllowCredentials(true); // Allow credentials (e.g., cookies or authorization headers)
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type")); // Allowed headers
        configuration.setExposedHeaders(Arrays.asList("Authorization")); // Expose the Authorization header if needed
        configuration.setMaxAge(3600L); // Cache duration for preflight requests

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply CORS configuration to all endpoints
        return source;
    }
}
