package base.api.rest.auth;

import base.api.annotations.CurrentUser;
import base.api.config.AppConstants;
import base.api.domain.user.UserEntity;
import base.api.rest.auth.dto.*;
import base.api.security.JwtAuthenticationTokenProvider;
import base.api.security.SystemUser;
import base.api.services.auth.AuthService;
import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final JwtAuthenticationTokenProvider tokenProvider;
  private AuthService authService;

  private AuthMapper authMapper = Mappers.getMapper(AuthMapper.class);

  public AuthController(
      AuthenticationManager authenticationManager,
      JwtAuthenticationTokenProvider tokenProvider,
      AuthService authService) {
    this.authenticationManager = authenticationManager;
    this.tokenProvider = tokenProvider;
    this.authService = authService;
  }

  @PostMapping("/log")
  public ResponseEntity<LoginResponseDto> logInByUserNameOrEmail(
      @RequestBody @Valid LoginRequestDto loginRequestDto) {

    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequestDto.getUserNameOrEmail(), loginRequestDto.getUserPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String authToken = tokenProvider.generateToken(authentication);

    return ResponseEntity.ok(new LoginResponseDto(authToken));
  }

  @PostMapping("/register-code")
  public ResponseEntity<Boolean> sendRegisterCode(@RequestBody String userEmail) {

    return authService.sendRegisterCode(userEmail)
        ? new ResponseEntity<>(true, HttpStatus.OK)
        : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/register")
  public ResponseEntity<Boolean> registerUser(
      @RequestBody @Valid RegisterRequestDto registerRequestDto) {

    UserEntity userEntity = authMapper.registerRequestToUserEntity(registerRequestDto);
    userEntity.setUserRoles(List.of(AppConstants.RoleName.ROLE_USER.name()));

    return authService.registerUser(registerRequestDto.getVerificationCode(), userEntity)
        ? new ResponseEntity<>(true, HttpStatus.OK)
        : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/recover-code")
  public ResponseEntity<Boolean> sendRecoverCode(@RequestBody String userEmail) {

    return authService.sendRecoverCode(userEmail)
        ? new ResponseEntity<>(true, HttpStatus.OK)
        : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/recover")
  public ResponseEntity<Boolean> recoverPassword(
      @RequestBody @Valid RecoverRequestDto recoverRequestDto) {

    UserEntity userEntity = authMapper.recoverRequestToUserEntity(recoverRequestDto);

    return authService.recoverUser(recoverRequestDto.getVerificationCode(), userEntity)
        ? new ResponseEntity<>(true, HttpStatus.OK)
        : new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
  }

  @PostMapping("/register/user-name")
  public ResponseEntity<Boolean> checkUserName(@RequestBody String userName) {
    return new ResponseEntity<>(authService.checkUserName(userName), HttpStatus.OK);
  }

  @PostMapping("/register/user-email")
  public ResponseEntity<Boolean> checkUserEmail(@RequestBody String userEmail) {
    return new ResponseEntity<>(authService.checkUserEmail(userEmail), HttpStatus.OK);
  }

  @GetMapping("/user")
  public ResponseEntity<UserSummaryDto> getUser(@CurrentUser SystemUser userDetails) {

    if (userDetails != null) {
      UserSummaryDto userSummaryDto =
          new UserSummaryDto(
              userDetails.getUsername(),
              userDetails.getUserEmail(),
              AuthorityUtils.authorityListToSet(userDetails.getAuthorities()));
      return ResponseEntity.ok(userSummaryDto);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }
}
