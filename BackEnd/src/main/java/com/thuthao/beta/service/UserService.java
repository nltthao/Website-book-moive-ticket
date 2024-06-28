package com.thuthao.beta.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thuthao.beta.config.JwtToken;

import com.thuthao.beta.entity.Role;
import com.thuthao.beta.entity.UserRole;
import com.thuthao.beta.entity.User;
import com.thuthao.beta.model.ResponseData;

import com.thuthao.beta.repository.UserRepository;
import com.thuthao.beta.repository.RoleRepository;
import com.thuthao.beta.repository.UserRoleReponsitory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    UserRoleReponsitory userRoleRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JwtToken token;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;


    public ResponseData<Integer> registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return new ResponseData(HttpStatus.OK, "username exist", 0);
        }
        if (userRepository.findByEmail(user.getUserEmail()) != null) {
            return new ResponseData(HttpStatus.OK, "email exist", 0);
        }
        if (userRepository.findByPhone(user.getUserPhone()) != null) {
            return new ResponseData(HttpStatus.OK, "phone exist", 0);
        }



        try {
            user.setPassword(passwordEncoder.encode(user.getPassword())); // Mã hóa mật khẩu
            userRepository.save(user); // Lưu người dùng vào cơ sở dữ liệu

            // Thiết lập vai trò mặc định cho người dùng (ví dụ: ROLE_USER)
            roleService.setDefaultRole(user.getUserId(), 1);

            return new ResponseData<>(HttpStatus.OK, "Success", user.getUserId());
        } catch (DataIntegrityViolationException e) {
            // Xử lý lỗi trùng lặp hoặc vi phạm ràng buộc dữ liệu
            return new ResponseData<>(HttpStatus.CONFLICT, "User already exists or violates data constraints", 0);
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return new ResponseData<>(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to register user", 0);
        }
    }

    public ResponseData<String> loginUser(String username, String password) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username, password
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = token.generateToken((UserDetails) authentication.getPrincipal());
        AccountDetailsImpl userDetails = (AccountDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
//        String jwtResponse = new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles);
// Tạo một đối tượng chứa thông tin cần thiết
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("jwt", jwt);
        responseData.put("id", userDetails.getUser().getUserId());
        responseData.put("username", userDetails.getUsername());
        responseData.put("roles", roles);

        // Chuyển đối tượng thành chuỗi JSON
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse;
        try {
            jsonResponse = objectMapper.writeValueAsString(responseData);
        } catch (JsonProcessingException e) {
            // Xử lý ngoại lệ nếu cần
            e.printStackTrace();
            return new ResponseData<>(HttpStatus.INTERNAL_SERVER_ERROR, "Error occurred while processing JSON", null);
        }

        return new ResponseData(HttpStatus.OK, "success", jwt);
    }

    public ResponseData<User> getInfo(Authentication authentication) {
        return new ResponseData(HttpStatus.OK, "success", userRepository.findByUsername(authentication.getName()));
    }


    ///
//    public List<User> listAll(String keyword) {
//        if (keyword == null || keyword.isEmpty()) {
//            return userRepository.findAll();
//        }
//        return userRepository.search(keyword);
////        if (keyword != null) {
////            return userRepository.search(keyword);
////        }
////        return userRepository.findAll();
//    }
//

    public List<User> listAll(String keyword) {
        List<User> users;

        if (keyword == null || keyword.isBlank()) {
            users = userRepository.findAll();
        } else {
            users = userRepository.search("%" + keyword + "%");
        }

        // Nếu bạn cần thiết, tải vai trò của người dùng
        users.forEach(user -> {
            // Load roles if necessary (assuming roles are fetched EAGERLY or using JOIN FETCH)
            List<Role> roles = user.getUserRoles().stream()
                    .map(UserRole::getRole)
                    .collect(Collectors.toList());
            user.setRoles(roles);
        });

        return users;
    }

    public User adduser(User user) {
        return userRepository.save(user);
    }
    public void deleteUser(Integer user_id) {
        userRepository.deleteById(user_id);
    }


public User updateUser(int userId, User updatedUserData) {
    User existingUser = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

    // Update fields that need to be changed
    if (updatedUserData.getUserFullname() != null) {
        existingUser.setUserFullname(updatedUserData.getUserFullname());
    }
    if (updatedUserData.getUserEmail() != null) {
        existingUser.setUserEmail(updatedUserData.getUserEmail());
    }
    if (updatedUserData.getUserPhone() != null) {
        existingUser.setUserPhone(updatedUserData.getUserPhone());
    }

    // Update user roles
    if (updatedUserData.getUserRoles() != null && !updatedUserData.getUserRoles().isEmpty()) {
        // Clear existing roles
        existingUser.getUserRoles().clear();

        // Set new roles
        for (UserRole userRole : updatedUserData.getUserRoles()) {
            userRole.setUser(existingUser); // Set the user for each role
            existingUser.getUserRoles().add(userRole);
        }
    }

    return userRepository.save(existingUser);
}
    public void deleteUser(int userId) {
        userRepository.deleteById(userId);
    }
}  

