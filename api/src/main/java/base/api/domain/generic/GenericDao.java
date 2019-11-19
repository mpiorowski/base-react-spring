package base.api.domain.generic;

import base.api.domain.user.UserEntity;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface GenericDao<E> {

  @Select("select * from sys_users where is_deleted is false and id = #{id}")
  UserEntity selectUser(Long id);

  List<E> findAll();

  Optional<E> findByUid(@Param("uid") UUID uid);

  Optional<E> add(E entity);

  Optional<E> edit(E entity);

  int delete(UUID uuid);
}
