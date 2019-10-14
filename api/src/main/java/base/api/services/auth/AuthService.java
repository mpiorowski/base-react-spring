package base.api.services.auth;

import base.api.config.AppConstants;
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

  //  TODO - token active times

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
  public boolean sendRegisterCode(String userEmail) {

    String token = UtilsString.generateSecureNumber(9999);
    String encodedToken = UtilsString.encodeString(token);
    String tokenType = AppConstants.TokenTypes.REGISTER_TOKEN;

    var tokenEntity = new TokenEntity();
    tokenEntity.setToken(encodedToken);
    tokenEntity.setType("register-token");
    tokenEntity.setEmail(userEmail);

    authDao.clearTokens(userEmail, tokenType);

    if (authDao.saveRegisterToken(tokenEntity)) {
      String message = MessagesConfig.RegisterTokenMessage.message(token);
      String header = MessagesConfig.RegisterTokenMessage.HEADER;
      mailService.sendHtmlMail(userEmail, header, message);
      return true;
    }
    return false;
  }

  @Transactional(rollbackFor = {MessagingException.class, UnsupportedEncodingException.class})
  public boolean registerUser(String verificationCode, UserEntity userEntity) {

    String userEmail = userEntity.getUserEmail();
    String tokenType = AppConstants.TokenTypes.REGISTER_TOKEN;

    String token = authDao.findTokenByType(userEmail, tokenType).getToken();
    if (!UtilsString.isBlank(token) && UtilsString.compareEncodedStrings(verificationCode, token)) {
      String encodedPassword = UtilsString.encodeString(userEntity.getUserPassword());
      userEntity.setUserPassword(encodedPassword);

      if (authDao.registerUser(userEntity)) {
        String userName = userEntity.getUserName();
        String message = MessagesConfig.WelcomeMessage.message(userName, userEmail);
        mailService.sendHtmlMail(
            userEntity.getUserEmail(), MessagesConfig.WelcomeMessage.HEADER, message);
        return true;
      }
    }
    return false;
  }

  @Transactional(rollbackFor = {MessagingException.class, UnsupportedEncodingException.class})
  public boolean sendRecoverCode(String userEmail) {

    String token = UtilsString.generateSecureNumber(9999);
    String encodedToken = UtilsString.encodeString(token);
    String tokenType = AppConstants.TokenTypes.RECOVER_TOKEN;

    var tokenEntity = new TokenEntity();
    tokenEntity.setToken(encodedToken);
    tokenEntity.setType(tokenType);
    tokenEntity.setEmail(userEmail);

    authDao.clearTokens(userEmail, tokenType);

    if (authDao.saveRegisterToken(tokenEntity)) {
      String message = MessagesConfig.RecoverMessage.messageCode(token);
      String header = MessagesConfig.RecoverMessage.HEADER_CODE;
      mailService.sendHtmlMail(userEmail, header, message);
      return true;
    }
    return false;
  }

  @Transactional(rollbackFor = {MessagingException.class, UnsupportedEncodingException.class})
  public boolean recoverUser(String verificationCode, UserEntity userEntity) {

    String userEmail = userEntity.getUserEmail();
    String tokenType = AppConstants.TokenTypes.RECOVER_TOKEN;

    String token = authDao.findTokenByType(userEmail, tokenType).getToken();
    if (!UtilsString.isBlank(token) && UtilsString.compareEncodedStrings(verificationCode, token)) {
      String encodedPassword = UtilsString.encodeString(userEntity.getUserPassword());
      userEntity.setUserPassword(encodedPassword);

      if (authDao.recoverUser(userEntity)) {
        String userName = userEntity.getUserName();
        String message = MessagesConfig.RecoverMessage.messageRecover(userName, userEmail);
        mailService.sendHtmlMail(
            userEntity.getUserEmail(), MessagesConfig.RecoverMessage.HEADER_RECOVER, message);
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
