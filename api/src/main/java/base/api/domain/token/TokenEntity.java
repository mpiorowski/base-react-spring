package base.api.domain.token;

import base.api.domain.generic.GenericEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TokenEntity extends GenericEntity {
  private String token;
  private String type;
  private String email;
}
