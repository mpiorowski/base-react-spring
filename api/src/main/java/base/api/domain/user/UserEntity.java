package base.api.domain.user;

import base.api.config.AppConstants;
import base.api.domain.generic.GenericEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserEntity extends GenericEntity {

  @NotBlank
  @Size(max = 40)
  private String userName;

  @NotBlank
  @Email
  @Size(max = 40)
  private String userEmail;

  @NotBlank
  @Size(max = 40)
  private String userPassword;

  @NotNull private List<String> userRoles;
}
