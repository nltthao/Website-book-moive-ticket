package com.thuthao.beta.model;

import java.util.List;

public class UserNameProfile {
    private int userId;
    private String username;
    private String userFullname;
    private String userEmail;
    private String userPhone;
    private List<String> roles;
    private int userPoint;

    public UserNameProfile() {
    }

    public UserNameProfile(int userId, String username, String userFullname, String userEmail, String userPhone, List<String> roles, int userPoint) {
        this.userId = userId;
        this.username = username;
        this.userFullname = userFullname;
        this.userEmail = userEmail;
        this.userPhone = userPhone;
        this.roles = roles;
        this.userPoint = userPoint;
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

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public int getUserPoint() {
        return userPoint;
    }

    public void setUserPoint(int userPoint) {
        this.userPoint = userPoint;
    }

}
