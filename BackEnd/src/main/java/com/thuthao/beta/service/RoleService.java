package com.thuthao.beta.service;

import com.thuthao.beta.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class RoleService {
    @Autowired
    RoleRepository roleRepository;


    // Phương thức để đặt vai trò mặc định cho người dùng
    public void setDefaultRole(Integer userId, Integer roleId) {
          roleRepository.setDefaultRole(userId, roleId);
    }

}
