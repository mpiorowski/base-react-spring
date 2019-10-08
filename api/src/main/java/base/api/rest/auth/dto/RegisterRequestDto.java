package base.api.rest.auth.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class RegisterRequestDto {

  @NotBlank
  @Size(max = 50)
  private String userName;

  @NotBlank
  @Size(max = 50)
  private String userEmail;

  @NotBlank
  @Size(max = 20)
  private String userPassword;
}
