package base.api.services.users;

import base.api.domain.user.UserDao;
import base.api.domain.user.UserEntity;
import base.api.services.generic.GenericService;
import base.api.utils.UtilsStringConversions;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UsersService extends GenericService<UserEntity, UserDao> {

  public UsersService(UserDao dao) {
    super(dao);
  }

  @Override
  public List<UserEntity> findAll() {
    return dao.findAllUser();
  }

  @Override
  public Optional<UserEntity> findByUid(String uid) {
    UUID uuid = UtilsStringConversions.uidDecode(uid);
    return dao.findByUid(uuid);
  }

  @Override
  public String add(UserEntity entity) {
    return null;
  }

  @Override
  public boolean edit(UserEntity entity) {
    return false;
  }

  @Override
  public boolean delete(String uid) {
    return false;
  }
}
