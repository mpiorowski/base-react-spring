package base.api.domain.generic;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.UUID;

@Data
public class GenericEntity {

  @NotNull
  protected Integer id;
  @NotNull
  protected UUID uid;
  //  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
  protected Date createdAt;
  //  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
  protected Date updatedAt;
  protected Integer version;
  protected Boolean isActive;
  protected Boolean isDeleted;
}
