package base.api.domain.forum.topics;

import base.api.domain.generic.GenericEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TopicEntity extends GenericEntity {

  private String topicTitle;
  private Integer topicViews;
  private Integer topicCategory;
}
