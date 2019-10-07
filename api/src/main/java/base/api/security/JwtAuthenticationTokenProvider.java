package base.api.security;

import base.api.config.AppConfig;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtAuthenticationTokenProvider {

  private static final Logger authLogger =
      LoggerFactory.getLogger(JwtAuthenticationTokenProvider.class);

  private final AppConfig appConfig;
  private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

  public JwtAuthenticationTokenProvider(AppConfig appConfig) {
    this.appConfig = appConfig;
  }

  public String generateToken(Authentication authentication) {

    SystemUser systemUser = (SystemUser) authentication.getPrincipal();

    Date now = new Date();
    Date expiryDate =
        new Date(now.getTime() + appConfig.getAuthentication().getJwtExpirationInMsRememberMe());

    return Jwts.builder()
        .setSubject(String.valueOf(systemUser.getUserId()))
        .setIssuedAt(new Date())
        .setExpiration(expiryDate)
        .signWith(key)
        .compact();
  }

  public boolean validateToken(String authToken) {
    try {
      Jwts.parser().setSigningKey(key).parseClaimsJws(authToken);
      return true;
    } catch (SignatureException ex) {
      authLogger.error("Invalid JWT signature");
    } catch (MalformedJwtException ex) {
      authLogger.error("Invalid JWT token");
    } catch (ExpiredJwtException ex) {
      authLogger.error("Expired JWT token");
    } catch (UnsupportedJwtException ex) {
      authLogger.error("Unsupported JWT token");
    } catch (IllegalArgumentException ex) {
      authLogger.error("JWT claims string is empty.");
    }
    return false;
  }

  public Long getUserIdFromAuthToken(String authToken) {
    Claims claims = Jwts.parser().setSigningKey(key).parseClaimsJws(authToken).getBody();

    return Long.valueOf(claims.getSubject());
  }
}
