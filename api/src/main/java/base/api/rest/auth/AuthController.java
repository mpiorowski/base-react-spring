package base.api.rest.auth;

import base.api.annotations.CurrentUser;
import base.api.rest.auth.dto.LoginRequestDto;
import base.api.rest.auth.dto.LoginResponseDto;
import base.api.rest.auth.dto.UserSummaryDto;
import base.api.security.JwtAuthenticationTokenProvider;
import base.api.security.SystemUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final JwtAuthenticationTokenProvider tokenProvider;

  public AuthController(
      AuthenticationManager authenticationManager, JwtAuthenticationTokenProvider tokenProvider) {
    this.authenticationManager = authenticationManager;
    this.tokenProvider = tokenProvider;
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

  @GetMapping("/user")
  public ResponseEntity<UserSummaryDto> getUser(@CurrentUser SystemUser userDetails) {

    UserSummaryDto userSummaryDto =
        new UserSummaryDto(
            userDetails.getUsername(),
            userDetails.getUserEmail(),
            AuthorityUtils.authorityListToSet(userDetails.getAuthorities()));

    return ResponseEntity.ok(userSummaryDto);
  }
}
