package base.api.rest.generic;

import lombok.Data;

import java.util.Date;

@Data
public class GenericResponseDto {
  protected String uid;
  protected Boolean active;
  protected Date createdAt;
  protected Date updatedAt;
}
