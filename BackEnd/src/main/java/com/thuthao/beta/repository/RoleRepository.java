package com.thuthao.beta.repository;

import com.thuthao.beta.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByRoleName( String roleName);
    @Query(value = "select * from role",nativeQuery = true)
    List<Role> finAllRole();

    /**
     *Nguyen Van Linh
     */
    @Transactional
    @Modifying
    @Query(value = "insert into users_role(user_id,role_id) values (?1,?2)", nativeQuery = true)
    void setDefaultRole(Integer userId, Integer roleId);

//    @Modifying
}
