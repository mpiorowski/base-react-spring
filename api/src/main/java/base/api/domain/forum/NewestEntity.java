package base.api.domain.forum;

import lombok.Data;

import java.util.UUID;

@Data
public class NewestEntity {
  private String newestDate;
  private UUID newestUid;
}
