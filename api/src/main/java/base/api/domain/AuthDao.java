package base.api.domain;

import base.api.domain.user.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface AuthDao {
  @Select({
    "select * from sys_users",
    "where ( user_name = #{userNameOrEmail} or user_email = #{userNameOrEmail} )",
    "and deleted is false"
  })
  UserEntity authUserByNameOrEmail(String userNameOrEmail);

  @Select({"select * from sys_users where id = #{userId} and deleted is false"})
  UserEntity authUserById(Long userId);
}
