package base.api.rest.generic;

import lombok.Data;

@Data
public class GenericFilter {
  private Integer limit;
  private Integer page;
  private String orderBy;
}
