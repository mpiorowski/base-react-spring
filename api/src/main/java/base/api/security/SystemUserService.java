package base.api.security;

import base.api.domain.user.UserEntity;
import base.api.services.auth.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class SystemUserService implements UserDetailsService {

  private static final Logger authLogger = LoggerFactory.getLogger(SystemUserService.class);
  private final AuthService service;

  public SystemUserService(AuthService service) {
    this.service = service;
  }

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String userNameOrEmail) {

    Optional<UserEntity> user = service.authUserByNameOrEmail(userNameOrEmail);

    if (user.isEmpty() || user.get().getUserName().equals("")) {
      throw new UsernameNotFoundException(
          "UserEntity not found with user name or email: " + userNameOrEmail);
    }
    return SystemUser.createUser(user.get());
  }

  @Transactional
  public UserDetails loadUserByUserId(Long userId) {

    Optional<UserEntity> user = service.authUserById(userId);

    if (user.isEmpty() || user.get().getUserName().equals("")) {
      throw new UsernameNotFoundException("UserEntity not found with user id: " + userId);
    }
    return SystemUser.createUser(user.get());
  }
}
