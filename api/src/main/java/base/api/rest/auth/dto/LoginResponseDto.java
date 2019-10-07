package base.api.rest.auth.dto;

import lombok.Data;

@Data
public class LoginResponseDto {

  private String authToken;

  private String tokenType = "Bearer";

  public LoginResponseDto(String authToken) {
    this.authToken = authToken;
  }
}
