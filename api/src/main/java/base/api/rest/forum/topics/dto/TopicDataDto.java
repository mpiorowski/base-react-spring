package base.api.rest.forum.topics.dto;

import base.api.domain.user.UserEntity;
import base.api.rest.generic.GenericResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TopicDataDto extends GenericResponseDto {
  private String topicTitle;
  private String topicDescription;
  private UserEntity topicAuthor;
  private int topicViews;
}
