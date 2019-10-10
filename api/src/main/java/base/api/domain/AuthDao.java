package base.api.domain;

import base.api.domain.user.UserEntity;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
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

  @Insert({
    "insert into sys_users",
    "(user_name, user_email, user_password, user_roles)",
    "values",
    "(#{userName}, #{userEmail}, crypt(#{userPassword}, gen_salt('bf', 8)), #{userRoles})"
  })
  boolean registerUser(UserEntity userEntity);

  @Select("select exists(select 1 from sys_users where user_name = #{userName})")
  boolean checkUserName(@Param("userName") String userName);

  @Select("select exists(select 1 from sys_users where user_email = #{userEmail})")
  boolean checkUserEmail(@Param("userEmail") String userEmail);
}
