package base.api.rest.forum.topics.dto;

import base.api.rest.generic.GenericResponseDto;
import base.api.rest.users.UserDataDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TopicDataDto extends GenericResponseDto {
  private String topicTitle;
  private String topicDescription;
  private UserDataDto topicAuthor;
  private int topicViews;
}
