package base.api.services.auth;

import base.api.config.AppConstants;
import base.api.config.mail.MessagesConfig;
import base.api.domain.AuthDao;
import base.api.domain.token.TokenEntity;
import base.api.domain.user.UserEntity;
import base.api.exceptions.InvalidTokenException;
import base.api.services.mail.MailService;
import base.api.services.token.TokenService;
import base.api.utils.UtilsString;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

  //  TODO - token active times dynamic (now 10 min)

  private static final Logger logger = LoggerFactory.getLogger(AuthService.class);
  private AuthDao authDao;
  private TokenService tokenService;
  private MailService mailService;

  public AuthService(AuthDao authDao, TokenService tokenService, MailService mailService) {
    this.authDao = authDao;
    this.tokenService = tokenService;
    this.mailService = mailService;
  }

  public Optional<UserEntity> authUserByNameOrEmail(String userNameOrEmail) {
    return authDao.authUserByNameOrEmail(userNameOrEmail);
  }

  public Optional<UserEntity> authUserById(Long userId) {
    return authDao.authUserById(userId);
  }

  @Transactional
  public boolean sendRegisterCode(UserEntity userEntity) throws JsonProcessingException {

    if (authDao.findUserByNameOrEmail(userEntity).isPresent()) {
      return false;
    }

    var mapper = new ObjectMapper();
    String userEmail = userEntity.getUserEmail();
    String code = UtilsString.generateSecureNumber(9999);
    String encodedToken = UtilsString.encodeString(code);
    String tokenType = AppConstants.TokenTypes.REGISTER_TOKEN;
    String tokenData = mapper.writeValueAsString(userEntity);
    var tokenEntity = new TokenEntity(encodedToken, tokenType, userEmail, tokenData);

    tokenService.addToken(tokenEntity);

    String message = MessagesConfig.RegisterTokenMessage.message(code);
    String header = MessagesConfig.RegisterTokenMessage.HEADER;
    mailService.sendHtmlMail(userEmail, header, message);

    return true;
  }

  @Transactional
  public boolean registerUser(String verificationCode, UserEntity userEntity)
      throws JsonProcessingException, InvalidTokenException {

    if (authDao.findUserByNameOrEmail(userEntity).isPresent()) {
      return false;
    }

    String userEmail = userEntity.getUserEmail();
    String tokenType = AppConstants.TokenTypes.REGISTER_TOKEN;

    Optional<TokenEntity> token = tokenService.findTokenByType(userEmail, tokenType);
    if (token.isPresent()
        && !token.get().getToken().isBlank()
        && UtilsString.compareEncodedStrings(verificationCode, token.get().getToken())
        && UtilsString.compareJsonToObject(token.get().getData(), userEntity)) {

      String encodedPassword = UtilsString.encodeString(userEntity.getUserPassword());
      userEntity.setUserPassword(encodedPassword);
      userEntity.setUserRoles(List.of(AppConstants.RoleName.ROLE_USER.name()));

      authDao.registerUser(userEntity);
      tokenService.clearTokens(userEmail, tokenType);

      String userName = userEntity.getUserName();
      String message = MessagesConfig.WelcomeMessage.message(userName, userEmail);
      mailService.sendHtmlMail(
          userEntity.getUserEmail(), MessagesConfig.WelcomeMessage.HEADER, message);
      return true;
    }
    throw new InvalidTokenException("Invalid token exception");
  }

  @Transactional
  public boolean sendRecoverCode(String userEmail) {

    if (!this.checkUserEmail(userEmail)) {
      return false;
    }

    String token = UtilsString.generateSecureNumber(9999);
    String encodedToken = UtilsString.encodeString(token);
    String tokenType = AppConstants.TokenTypes.RECOVER_TOKEN;

    var tokenEntity = new TokenEntity(encodedToken, tokenType, userEmail, "");

    tokenService.addToken(tokenEntity);

    String message = MessagesConfig.RecoverMessage.messageCode(token);
    String header = MessagesConfig.RecoverMessage.HEADER_CODE;
    mailService.sendHtmlMail(userEmail, header, message);
    return true;
  }

  @Transactional
  public boolean recoverUser(String verificationCode, UserEntity userEntity) {

    String userEmail = userEntity.getUserEmail();
    String tokenType = AppConstants.TokenTypes.RECOVER_TOKEN;

    Optional<TokenEntity> token = tokenService.findTokenByType(userEmail, tokenType);
    if (token.isPresent()
        && !token.get().getToken().isBlank()
        && UtilsString.compareEncodedStrings(verificationCode, token.get().getToken())) {
      String encodedPassword = UtilsString.encodeString(userEntity.getUserPassword());
      userEntity.setUserPassword(encodedPassword);

      authDao.recoverUser(userEntity);
      tokenService.clearTokens(userEmail, tokenType);

      String userName = userEntity.getUserName();
      String message = MessagesConfig.RecoverMessage.messageRecover(userName, userEmail);
      mailService.sendHtmlMail(
          userEntity.getUserEmail(), MessagesConfig.RecoverMessage.HEADER_RECOVER, message);
      return true;
    }
    throw new InvalidTokenException("Invalid token exception");
  }

  public boolean checkUserName(String userName) {
    return authDao.checkUserName(userName);
  }

  public boolean checkUserEmail(String userEmail) {
    return authDao.checkUserEmail(userEmail);
  }
}
