package base.api.rest.generic;

import lombok.Data;

@Data
public class GenericUidDto {

  private String uid;

  public GenericUidDto(String uid) {
    this.uid = uid;
  }
}
