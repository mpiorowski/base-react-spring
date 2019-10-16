package base.api.rest.error;

import lombok.Data;

@Data
public class ErrorDto {

  private String message;
  private String stack;
  private String componentStack;
}
