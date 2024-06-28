package com.thuthao.beta.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
@Data
@Entity
@Table(name = "users_role")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_role_id")
    private Integer userRoleId;

    @ManyToOne
//    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-userRole")
    private User user;

    @ManyToOne
    @JoinColumn(name = "role_id")
//    @JsonBackReference

    private Role role;

    public UserRole() {
    }

    public Integer getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(Integer userRoleId) {
        this.userRoleId = userRoleId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    @Override
    public int hashCode() {
        int result = 17;
        result = 31 * result + (userRoleId != null ? userRoleId.hashCode() : 0);
        // Tránh sử dụng toàn bộ tập hợp accounts để ngăn chặn tham chiếu vòng
        return result;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRole role = (UserRole) o;
        // So sánh chỉ roleId hoặc một định danh duy nhất khác không đệ quy
        return userRoleId != null && userRoleId.equals(role.userRoleId);
    }
}
