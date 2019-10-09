package base.api.domain.user;

import base.api.domain.generic.GenericEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.*;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserEntity extends GenericEntity {

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

  @NotEmpty @NotNull private List<String> userRoles;
}
