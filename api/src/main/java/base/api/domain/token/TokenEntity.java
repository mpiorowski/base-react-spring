package base.api.domain.token;

import base.api.domain.generic.GenericEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class TokenEntity extends GenericEntity {
  private String token;
  private String type;
  private String email;
}
