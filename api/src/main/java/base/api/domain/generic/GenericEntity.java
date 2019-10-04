package base.api.domain.generic;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class GenericEntity {

    protected Long id;
    protected UUID uid;
  //  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    protected Date createdAt;
  //  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss")
    protected Date updatedAt;
    protected Long version;
    protected Boolean active;
    protected Boolean deleted;

}
