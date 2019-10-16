package base.api.services.token;

import base.api.domain.token.TokenDao;
import base.api.domain.token.TokenEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TokenService {
  private TokenDao tokenDao;

  public TokenService(TokenDao tokenDao) {
    this.tokenDao = tokenDao;
  }

  public Optional<TokenEntity> findTokenByType(String email, String type) {
    return tokenDao.findTokenByType(email, type);
  }

  public void clearTokens(String email, String type) {
    tokenDao.clearTokens(email, type);
  }

  public void addToken(TokenEntity tokenEntity) {
    this.clearTokens(tokenEntity.getEmail(), tokenEntity.getType());
    tokenDao.addToken(tokenEntity);
  }
}
