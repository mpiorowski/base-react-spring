package base.api.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private static final Logger authLogger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

  private JwtAuthenticationTokenProvider tokenProvider;
  private SystemUserService systemUserService;

  public JwtAuthenticationFilter(
      JwtAuthenticationTokenProvider tokenProvider,
      SystemUserService systemUserService) {
    this.tokenProvider = tokenProvider;
    this.systemUserService = systemUserService;
  }

  private String getAuthTokenFromRequest(HttpServletRequest httpServletRequest) {
    String authToken = httpServletRequest.getHeader("Authorization");
    if (StringUtils.hasText(authToken) && authToken.startsWith("Bearer ")) {
      return authToken.substring(7);
    }
    return null;
  }

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    try {
      String authToken = getAuthTokenFromRequest(request);
      if (StringUtils.hasText(authToken) && tokenProvider.validateToken(authToken)) {
        Long userId = tokenProvider.getUserIdFromAuthToken(authToken);

        UserDetails userDetails = systemUserService.loadUserByUserId(userId);

        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      }
    } catch (Exception ex) {
      authLogger.error("Could not set user authentication in security context", ex);
    }

    filterChain.doFilter(request, response);
  }
}
