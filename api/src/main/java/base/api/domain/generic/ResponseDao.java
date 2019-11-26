package base.api.domain.generic;

import lombok.Data;

import java.util.UUID;

@Data
public class ResponseDao {

  private Integer id;
  private UUID uid;
}
