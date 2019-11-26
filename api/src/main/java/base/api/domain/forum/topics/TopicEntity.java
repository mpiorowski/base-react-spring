package base.api.domain.forum.topics;

import base.api.domain.generic.GenericEntity;
import base.api.domain.user.UserEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TopicEntity extends GenericEntity {

  private String topicTitle;
  private String topicDescription;
  private Integer topicViews;
  private Integer topicCategory;
  private UserEntity topicAuthor;
}
