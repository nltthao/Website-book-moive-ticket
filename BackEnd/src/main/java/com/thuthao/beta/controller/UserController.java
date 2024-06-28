package com.thuthao.beta.controller;

import com.thuthao.beta.entity.User;
import com.thuthao.beta.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
@CrossOrigin("*")
@RestController
@Api(value = "Api user")
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @ApiOperation(value = "Đăng ký user")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user){
        return ResponseEntity.ok(userService.registerUser(user));
    }



    @ApiOperation(value = "Đăng nhập - Get token login")
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody HashMap<String, String> request){
        return ResponseEntity.ok(userService.loginUser(request.get("username"), request.get("password")));
    }
    @GetMapping("/info")
    public ResponseEntity<?> getInfo(Authentication authentication){
        return ResponseEntity.ok(userService.getInfo(authentication));
    }
}
