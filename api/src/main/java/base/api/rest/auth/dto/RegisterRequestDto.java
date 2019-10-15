package base.api.rest.auth.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class RegisterRequestDto {

  private String verificationCode;

  @NotBlank
  @Size(max = 100)
  private String userName;

  @NotBlank
  @Email
  @Size(max = 100)
  private String userEmail;

  @NotBlank
  @Size(max = 20)
  private String userPassword;
}
