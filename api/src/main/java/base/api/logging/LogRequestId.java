package base.api.logging;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class LogRequestId extends OncePerRequestFilter {

  private static final String REQUEST_ID_HEADER = "X-Request-Id";
  private static final String REQUEST_ID_MDC_KEY = "requestId";
  private static final String USER_ID_MDC_KEY = "userId";

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    try {
      String requestId = RandomStringUtils.random(8, true, true).toLowerCase();
      String userId = "0000";

      MDC.put(REQUEST_ID_MDC_KEY, requestId);
      MDC.put(USER_ID_MDC_KEY, userId);
      response.setHeader(REQUEST_ID_HEADER, requestId);
      filterChain.doFilter(request, response);
    } finally {
      MDC.clear();
    }
  }
}
