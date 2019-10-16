package base.api.domain;

import base.api.domain.user.UserEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Mapper
@Repository
public interface AuthDao {
  @Select({
    "select * from sys_users",
    "where ( user_name = #{userNameOrEmail} or user_email = #{userNameOrEmail} )",
    "and is_deleted is false",
    "and is_active is true",
  })
  Optional<UserEntity> authUserByNameOrEmail(String userNameOrEmail);

  // TODO - deleted user cannot be added
  @Select({
    "select * from sys_users",
    "where ( user_name = #{userName} or user_email = #{userEmail} )",
  })
  Optional<UserEntity> findUserByNameOrEmail(UserEntity userEntity);

  @Select({
    "select * from sys_users where id = #{userId} and is_deleted is false and is_active is true"
  })
  Optional<UserEntity> authUserById(Long userId);

  @Insert({
    "insert into sys_users",
    "(user_name, user_email, user_password, user_roles)",
    "values",
    "(#{userName}, #{userEmail}, #{userPassword}, #{userRoles})"
  })
  void registerUser(UserEntity userEntity);

  @Update({
    "update sys_users set",
    "user_password = #{userPassword}",
    "where user_email = #{userEmail}",
    "and is_active is true and is_deleted is false"
  })
  boolean recoverUser(UserEntity userEntity);

  // TODO - work with deleted users
  @Select({
    "select exists(select 1 from sys_users where user_name = #{userName}",
    "and is_deleted is false and is_active is true)"
  })
  boolean checkUserName(@Param("userName") String userName);

  @Select({
    "select exists(select 1 from sys_users where user_email = #{userEmail}",
    "and is_deleted is false and is_active is true)"
  })
  boolean checkUserEmail(@Param("userEmail") String userEmail);
}
