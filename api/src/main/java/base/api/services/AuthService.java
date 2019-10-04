package base.api.services;

import base.api.domain.AuthDao;
import base.api.domain.user.UserEntity;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  private AuthDao authDao;

  public AuthService(AuthDao authDao) {
    this.authDao = authDao;
  }

  public UserEntity authUserByNameOrEmail(String userNameOrEmail) {
    return authDao.authUserByNameOrEmail(userNameOrEmail);
  }

  public UserEntity authUserById(Long userId) {
    return authDao.authUserById(userId);
  }
}
