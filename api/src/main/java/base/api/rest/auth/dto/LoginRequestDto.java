package base.api.rest.auth.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class LoginRequestDto {

  @NotNull
  @Size(max = 20)
  private String userNameOrEmail;

  @NotNull
  @Size(max = 20)
  private String userPassword;
}
