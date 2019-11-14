package base.api.domain.generic;

import base.api.domain.SqLBuilder;
import base.api.domain.user.UserEntity;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GenericDao<E> {

  @Select("select * from sys_users where is_deleted is false and id = #{id}")
  UserEntity selectUser(Long id);

  @SelectProvider(type = SqLBuilder.class, method = "selectAll")
  List<E> findAll(String table);

  @SelectProvider(type = SqLBuilder.class, method = "selectByUid")
  Optional<E> findByUid(String table, @Param("uid") UUID uid);

  Optional<E> findByUid1(@Param("uid") UUID uid);

  ResponseDao add(E entity);

  ResponseDao edit(E entity);

  int delete(UUID uuid);
}
