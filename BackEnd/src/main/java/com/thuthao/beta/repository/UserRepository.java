package com.thuthao.beta.repository;

import com.thuthao.beta.entity.User;
import com.thuthao.beta.model.UserNameProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT DISTINCT u FROM User u " +
            "LEFT JOIN FETCH u.userRoles ur " +
            "LEFT JOIN FETCH ur.role r")
    List<User> findAllWithRoles();
    @Query(name = "getUserNameProfile", nativeQuery = true)
    UserNameProfile getUserById(Integer user_id);
    //Thêm user vào dữ liệu ;
    @Transactional
    @Modifying
    @Query(value = "INSERT INTO `users`( `username`, `password`,  `user_fullname`,   `user_email`, `user_phone`, `user_point`) VALUES (?1,?2,?3,?4,?5,0)", nativeQuery = true)
    Integer registerUser(String username, String password,String user_fullname,   String user_email, String user_phone);
    //update

@Query("SELECT u FROM User u LEFT JOIN FETCH u.userRoles WHERE u.username = :username")
User findByUsername(@Param("username") String username);

    @Query(nativeQuery = true, value = "SELECT * FROM `users` WHERE `user_email` = ?1")
    User findByEmail(String email);

    @Query(nativeQuery = true, value = "SELECT * FROM `users` WHERE `user_phone` = ?1")
    User findByPhone(String email);

    @Query(nativeQuery = true, value = "SELECT `user_id` FROM `users` WHERE `username` = ?1")
    Integer findIdByUsername(String username);

    @Query(value = "SELECT `user_point` FROM `users` WHERE `user_id` = ?1", nativeQuery = true)
    Double getPoint(Integer user_id);

    @Transactional
    @Modifying
    @Query(value = "UPDATE `users` SET `user_point`=?1  WHERE `user_id`= ?2", nativeQuery = true)
    Integer addPoint(Double point, Integer user_id);

///
//@Query("SELECT p FROM User p WHERE CONCAT(p.username, p.userFullname, p.userPhone) LIKE %?1%")
//public List<User> search(String keyword);
@Query("SELECT DISTINCT p FROM User p LEFT JOIN FETCH p.userRoles ur LEFT JOIN FETCH ur.role WHERE CONCAT(p.username, ' ', p.userFullname, ' ', p.userPhone) LIKE :keyword")
List<User> search(@Param("keyword") String keyword);
    void deleteByUsername(String username);
}
