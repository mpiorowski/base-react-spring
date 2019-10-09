package base.api.rest.auth.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class LoginRequestDto {

  @NotBlank
  @Size(max = 100)
  private String userNameOrEmail;

  @NotBlank
  @Size(max = 20)
  private String userPassword;
}
