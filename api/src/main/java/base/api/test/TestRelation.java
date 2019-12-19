package base.api.test;

import base.api.domain.forum.categories.CategoryEntity;
import base.api.domain.user.UserEntity;
import lombok.Data;

@Data
public class TestRelation<D, U> {

  private D dataEntity;
  private U userEntity;

  public D getDataEntity() {
    return dataEntity;
  }

  public void setDataEntity(D dataEntity) {
    this.dataEntity = dataEntity;
  }

  public U getUserEntity() {
    return userEntity;
  }

  public void setUserEntity(U userEntity) {
    this.userEntity = userEntity;
  }
}
