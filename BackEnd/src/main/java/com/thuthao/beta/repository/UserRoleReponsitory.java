package com.thuthao.beta.repository;

import com.thuthao.beta.entity.User;
import com.thuthao.beta.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRoleReponsitory extends JpaRepository<UserRole, Integer> {
    List<UserRole> findByUser(User user);
}
