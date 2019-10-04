package base.api.domain.generic;

import base.api.domain.user.UserEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Mapper
@Repository
public interface GenericDao<E> {

  @Select("select * from sys_users where deleted is false and id = #{id}")
  UserEntity selectUser(Long id);

  List<E> findAll();

  Optional<E> findByUid(@Param("uid") UUID uuid);

  UUID add(E entity);

  int edit(E entity);

  int delete(@Param("uid") UUID uuid);
}
