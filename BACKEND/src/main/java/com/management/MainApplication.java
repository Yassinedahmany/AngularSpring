package com.management;

import com.management.entities.Role;
import com.management.entities.User;
import com.management.services.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class MainApplication {
    @Autowired
    UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(MainApplication.class, args);
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    //@PostConstruct
    void initial_users(){
        userService.addRole(new Role(null,"ADMIN"));
        userService.addRole(new Role(null,"CASHIER"));
        userService.addRole(new Role(null,"USER"));
        userService.addRole(new Role(null,"CREATE"));

        userService.saveUser(new User(null,"admin","123",true,null));
        userService.saveUser(new User(null,"cashier","123",true,null));
        userService.saveUser(new User(null,"accountant","123",true,null));

        userService.addRoleToUser("admin","ADMIN");
        userService.addRoleToUser("admin","CREATE");
        userService.addRoleToUser("cashier","CASHIER");
        userService.addRoleToUser("cashier","CREATE");
        userService.addRoleToUser("accountant","USER");
    }
}
