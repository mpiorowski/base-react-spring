package base.api.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pbs.api.domain.sys.AuthDao;
import pbs.api.domain.user.UserEntity;

@Service
public class SystemUserService implements UserDetailsService {

  private final AuthDao authDao;

  public SystemUserService(AuthDao authDao) {
    this.authDao = authDao;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String userNameOrEmail) {

    UserEntity user = authDao.authUserByNameOrEmail(userNameOrEmail);

    if (user.getUserName().equals("")) {
      throw new UsernameNotFoundException(
          "UserEntity not found with user name or email: " + userNameOrEmail);
    }
    return SystemUser.createUser(user);
  }

  @Transactional
  public UserDetails loadUserByUserId(Long userId) {

    UserEntity user = authDao.authUserById(userId);

    if (user.getUserName().equals("")) {
      throw new UsernameNotFoundException("UserEntity not found with user id: " + userId);
    }
    return SystemUser.createUser(user);
  }
}
