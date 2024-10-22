package com.management.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.management.entities.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        User user =null;
        try {
            user = new ObjectMapper().readValue(request.getInputStream(),User.class);
            } catch (IOException e) {
            throw new RuntimeException(e);
        }
        assert user != null;
        return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        user.getUsername(), user.getPassword()
                ));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        org.springframework.security.core.userdetails.User user = (org.springframework.security.core.userdetails.User) authResult.getPrincipal();
        List<String> roles = new ArrayList<>();
        user.getAuthorities().forEach(a -> {
                roles.add(a.getAuthority());
    });
    String jwt =JWT.create()
            .withSubject(user.getUsername())
            .withArrayClaim("roles",roles.toArray(new String[0]))
            .withExpiresAt(new Date(System.currentTimeMillis()+SecurityParameters.EXPIRATION_TIME))
            .sign(Algorithm.HMAC256(SecurityParameters.SECRET));
    response.addHeader("Authorization",jwt);
}}
