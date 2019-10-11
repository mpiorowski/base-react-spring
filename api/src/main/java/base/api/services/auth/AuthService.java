package base.api.services.auth;

import base.api.config.mail.MessagesConfig;
import base.api.domain.AuthDao;
import base.api.domain.token.TokenEntity;
import base.api.domain.user.UserEntity;
import base.api.services.mail.MailService;
import base.api.utils.UtilsString;
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
  public boolean sendRegisterCode(String userEmail)
      throws MessagingException, UnsupportedEncodingException {

    String token = UtilsString.generateSecureNumber(9999);
    String encodedToken = UtilsString.encodeString(token);

    var tokenEntity = new TokenEntity();
    tokenEntity.setToken(encodedToken);
    tokenEntity.setType("register-token");
    tokenEntity.setEmail(userEmail);

    authDao.clearRegisterToken(userEmail);

    if (authDao.saveRegisterToken(tokenEntity)) {
      String message = MessagesConfig.RegisterTokenMessage.message(token);
      mailService.sendHtmlMail(userEmail, MessagesConfig.WelcomeMessage.HEADER, message);
      return true;
    }
    return false;
  }

  @Transactional(rollbackFor = {MessagingException.class, UnsupportedEncodingException.class})
  public boolean registerUser(String verificationCode, UserEntity userEntity)
      throws MessagingException, UnsupportedEncodingException {

    String token = authDao.findRegisterToken(userEntity.getUserEmail()).getToken();
    if (!UtilsString.isBlank(token)
        && UtilsString.compareEncodedStrings(verificationCode, token)) {
      String encodedPassword = UtilsString.encodeString(userEntity.getUserPassword());
      userEntity.setUserPassword(encodedPassword);

      if (authDao.registerUser(userEntity)) {
        String userName = userEntity.getUserName();
        String userEmail = userEntity.getUserEmail();
        String message = MessagesConfig.WelcomeMessage.message(userName, userEmail);
        mailService.sendHtmlMail(
            userEntity.getUserEmail(), MessagesConfig.WelcomeMessage.HEADER, message);
        return true;
      }
    }
    return false;
  }

  public boolean checkUserName(String userName) {
    return authDao.checkUserName(userName);
  }

  public boolean checkUserEmail(String userEmail) {
    return authDao.checkUserEmail(userEmail);
  }
}
