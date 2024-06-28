package com.thuthao.beta.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Set;


@Data

@Entity
@Table(name = "role")
public class Role {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Integer roleId;

    @Column(name = "role_name")
    private String roleName;

//    @OneToMany(mappedBy = "role")
////    @JsonManagedReference
//    private List<UserRole> userRoles;
//@OneToMany(mappedBy = "role")

//private Set<UserRole> userRoles;
    public Role() {
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }


//    public List<UserRole> getUserRoles() {
//        return userRoles;
//    }
//
//    public void setUserRoles(List<UserRole> userRoles) {
//        this.userRoles = userRoles;
//    }
}
