package base.api.rest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler({BadCredentialsException.class})
  protected ResponseEntity<Object> badCredentials(RuntimeException ex, WebRequest request) {
    String bodyOfResponse = "Wrong credentials";
    return handleExceptionInternal(
        ex, bodyOfResponse, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
  }

  @ExceptionHandler
  protected ResponseEntity<Object> handleConflict(RuntimeException ex, WebRequest request) {
    String bodyOfResponse = "There was a problem with the request";
    return handleExceptionInternal(
        ex, bodyOfResponse, new HttpHeaders(), HttpStatus.CONFLICT, request);
  }
}
