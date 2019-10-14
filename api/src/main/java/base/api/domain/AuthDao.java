package base.api.domain;

import base.api.domain.token.TokenEntity;
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

  @Select({
    "select * from sys_users where id = #{userId} and is_deleted is false and is_active is true"
  })
  Optional<UserEntity> authUserById(Long userId);

  @Insert({
    "insert into sys_tokens",
    "(token, type, email)",
    "values",
    "(#{token}, #{type}, #{email})"
  })
  void saveRegisterToken(TokenEntity tokenEntity);

  @Select({
    "select * from sys_tokens",
    "where email = #{email} and type = #{type} and created_at > ( NOW() - INTERVAL '10 min' )",
    "and is_active is true and is_deleted is false limit 1"
  })
  Optional<TokenEntity> findTokenByType(@Param("email") String email, @Param("type") String type);

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

  @Update({
    "update sys_tokens set is_active = false where email = #{email} and type = #{type}",
  })
  void clearTokens(@Param("email") String email, @Param("type") String type);

  @Select("select exists(select 1 from sys_users where user_name = #{userName})")
  boolean checkUserName(@Param("userName") String userName);

  @Select("select exists(select 1 from sys_users where user_email = #{userEmail})")
  boolean checkUserEmail(@Param("userEmail") String userEmail);
}
