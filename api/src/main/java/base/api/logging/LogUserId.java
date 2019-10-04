package base.api.logging;

import base.api.security.SystemUser;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class LogUserId extends OncePerRequestFilter {

  private static final String USER_ID_MDC_KEY = "userId";

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      String userId = "0000";

      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
        SystemUser userDetails = (SystemUser) authentication.getPrincipal();
        userId = userDetails.getUserId().toString();
        userId = StringUtils.leftPad(userId, 4, "0");
      }

      MDC.put(USER_ID_MDC_KEY, userId);
      filterChain.doFilter(request, response);
    } finally {
      MDC.clear();
    }
  }
}
