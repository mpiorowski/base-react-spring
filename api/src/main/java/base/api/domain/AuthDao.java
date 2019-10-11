package base.api.domain;

import base.api.domain.token.TokenEntity;
import base.api.domain.user.UserEntity;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AuthDao {
  @Select({
    "select * from sys_users",
    "where ( user_name = #{userNameOrEmail} or user_email = #{userNameOrEmail} )",
    "and is_deleted is false",
    "and is_active is true",
  })
  UserEntity authUserByNameOrEmail(String userNameOrEmail);

  @Select({
    "select * from sys_users where id = #{userId} and is_deleted is false and is_active is true"
  })
  UserEntity authUserById(Long userId);

  @Update({
    "update sys_tokens set is_active = false where email = #{email} and type = 'register-token'",
  })
  void clearRegisterToken(String email);

  @Insert({
    "insert into sys_tokens",
    "(token, type, email)",
    "values",
    "(#{token}, #{type}, #{email})"
  })
  boolean saveRegisterToken(TokenEntity tokenEntity);

  @Select({
    "select * from sys_tokens",
    "where email = #{userEmail} and created_at > ( NOW() - INTERVAL '10 min' )",
    "and is_active is true and is_deleted is false limit 1"
  })
  TokenEntity findRegisterToken(String userEmail);

  @Insert({
    "insert into sys_users",
    "(user_name, user_email, user_password, user_roles)",
    "values",
    "(#{userName}, #{userEmail}, #{userPassword}, #{userRoles})"
  })
  boolean registerUser(UserEntity userEntity);

  @Select("select exists(select 1 from sys_users where user_name = #{userName})")
  boolean checkUserName(@Param("userName") String userName);

  @Select("select exists(select 1 from sys_users where user_email = #{userEmail})")
  boolean checkUserEmail(@Param("userEmail") String userEmail);
}
