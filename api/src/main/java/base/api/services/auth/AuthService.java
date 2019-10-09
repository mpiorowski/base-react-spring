package base.api.services.auth;

import base.api.config.mail.MessagesConfig;
import base.api.domain.AuthDao;
import base.api.domain.user.UserEntity;
import base.api.services.mail.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@Service
public class AuthService {

  private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

  private AuthDao authDao;
  private MailService mailService;

  public AuthService(AuthDao authDao, MailService mailService) {
    this.authDao = authDao;
    this.mailService = mailService;
  }

  public UserEntity authUserByNameOrEmail(String userNameOrEmail) {
    return authDao.authUserByNameOrEmail(userNameOrEmail);
  }

  public UserEntity authUserById(Long userId) {
    return authDao.authUserById(userId);
  }

  @Transactional(rollbackFor = {MessagingException.class, UnsupportedEncodingException.class})
  public boolean registerUser(UserEntity userEntity)
      throws MessagingException, UnsupportedEncodingException {
    if (authDao.registerUser(userEntity)) {
      String userName = userEntity.getUserName();
      String userEmail = userEntity.getUserEmail();
      String message = MessagesConfig.WelcomeMessage.message(userName, userEmail);
      mailService.sendHtmlMail(
          userEntity.getUserEmail(), MessagesConfig.WelcomeMessage.HEADER, message);
      return true;
    }
    return false;
  }

  public boolean checkUserName(String userName) {
    return authDao.checkUserName(userName);
  }
}
