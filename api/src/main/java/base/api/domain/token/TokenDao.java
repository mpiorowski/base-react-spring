package base.api.domain.token;

import base.api.domain.generic.GenericDao;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Mapper
@Repository
public interface TokenDao {

  @Insert({
    "insert into sys_tokens",
    "(token, type, email, data)",
    "values",
    "(#{token}, #{type}, #{email}, #{data})"
  })
  void addToken(TokenEntity tokenEntity);

  @Select({
    "select * from sys_tokens",
    "where email = #{email} and type = #{type} and created_at > ( NOW() - INTERVAL '10 min' )",
    "and is_active is true and is_deleted is false limit 1"
  })
  Optional<TokenEntity> findTokenByType(@Param("email") String email, @Param("type") String type);


  @Update({
    "update sys_tokens set is_active = false, data = '' where email = #{email} and type = #{type}",
  })
  void clearTokens(@Param("email") String email, @Param("type") String type);
}
