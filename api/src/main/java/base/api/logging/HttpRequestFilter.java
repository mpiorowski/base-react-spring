package base.api.logging;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.MDC;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class HttpRequestFilter implements Filter {

  private static final String REQUEST_ID_HEADER = "X-Request-ID";
  private static final String REQUEST_ID_MDC_KEY = "request_id";
  private static final String SESSION_ID_MDC_KEY = "session_id";

  @Override
  public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterchain)
      throws IOException, ServletException {

    if (!(request instanceof HttpServletRequest) || !(response instanceof HttpServletResponse)) {
      throw new ServletException("OncePerRequestFilter just supports HTTP requests");
    }
    HttpServletResponse httpResponse = (HttpServletResponse) response;

    try {
      String requestId = RandomStringUtils.random(16, true, true).toLowerCase();
      MDC.put(REQUEST_ID_MDC_KEY, requestId);
      httpResponse.setHeader(REQUEST_ID_HEADER, requestId);
      filterchain.doFilter(request, response);
    } finally {
      MDC.remove(REQUEST_ID_MDC_KEY);
      MDC.remove(SESSION_ID_MDC_KEY);
    }
  }
}
