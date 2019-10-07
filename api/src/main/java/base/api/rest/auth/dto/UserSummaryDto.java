package base.api.rest.auth.dto;

import lombok.Data;

import java.util.Set;


@Data
public class UserSummaryDto {

  private String userName;
  private String userEmail;
  private Set<String> userRoles;

  public UserSummaryDto(String userName, String userEmail, Set<String> authorityListToSet) {
    this.userName = userName;
    this.userEmail = userEmail;
    this.userRoles = authorityListToSet;
  }
}
