package com.thuthao.beta.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.thuthao.beta.model.UserNameProfile;
import lombok.Data;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;


@SqlResultSetMappings({
        @SqlResultSetMapping(
                name = "UserNameProfile",
                classes = @ConstructorResult(
                        targetClass = UserNameProfile.class,
                        columns = {
                                @ColumnResult(name = "user_id", type = Integer.class),
                                @ColumnResult(name = "username", type = String.class),

                                @ColumnResult(name = "user_fullname", type = String.class),


                                @ColumnResult(name = "user_email", type = String.class),

                                @ColumnResult(name = "user_phone", type = String.class),
                                @ColumnResult(name = "role", type = String.class),
                                @ColumnResult(name = "user_point", type = Integer.class)
                        }
                )
        )
})
@NamedNativeQuery(name = "getUserNameProfile", resultSetMapping = "UserNameProfile",
        query = "SELECT `user_id`,`username`,`user_fullname`,`user_email`,`user_phone`,`role`,`user_point` FROM `users` WHERE `user_id` = ?1")

@Data
@Entity
@Table(name = "users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;


    @Column(name = "user_fullname")
    private String userFullname;


    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_phone")
    private String userPhone;
//    @OneToMany(mappedBy = "user")
@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("user-userRole")
    private List<UserRole> userRoles;
//@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "user")
//private Set<UserRole> userRoles;
    public User() {
    }

    public User(int userId, String username, String password, String userFullname, String userEmail, String userPhone, List<UserRole> userRoles) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.userFullname = userFullname;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.userRoles = userRoles;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getUserFullname() {
        return userFullname;
    }

    public void setUserFullname(String userFullname) {
        this.userFullname = userFullname;
    }



    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }



    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
    }

    public List<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(List<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    public void setRoles(List<Role> roles) {
        List<String> roleNames = roles.stream()
                .map(Role::getRoleName)
                .collect(Collectors.toList());
        // Assign role names or roles to user as needed
        // For example, assign role names to a field like this:
        // this.roles = roleNames;
    }



}
