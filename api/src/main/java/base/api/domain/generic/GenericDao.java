package base.api.domain.generic;

import base.api.domain.SqLBuilder;
import base.api.domain.user.UserEntity;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectProvider;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GenericDao<E> {

  @Select("select * from sys_users where deleted is false and id = #{id}")
  UserEntity selectUser(Long id);

  @SelectProvider(type = SqLBuilder.class, method = "selectAll")
  List<E> findAll(String table);

  @SelectProvider(type = SqLBuilder.class, method = "selectByUid")
  Optional<E> findByUid(String table, UUID uid);

  UUID add(E entity);

  int edit(E entity);

  int delete(UUID uuid);
}
