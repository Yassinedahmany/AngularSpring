package com.management.restcontrollers;

import com.management.entities.User;
import com.management.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserRestController {
    @Autowired
    UserRepository userRepository;

    @GetMapping(path = "/users")
    public List<User> getAllUsers() {return userRepository.findAll();}
}
