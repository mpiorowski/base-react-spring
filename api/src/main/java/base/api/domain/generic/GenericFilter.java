package base.api.domain.generic;

import lombok.Data;

import javax.validation.constraints.Size;

@Data
public class GenericFilter {

  @Size(min = 2)
  private String search;

  private Boolean active;
}
