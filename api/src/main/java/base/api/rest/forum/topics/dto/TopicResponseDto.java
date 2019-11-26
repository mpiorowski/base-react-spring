package base.api.rest.forum.topics.dto;

import base.api.rest.generic.GenericResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TopicResponseDto extends GenericResponseDto {

  private String topicTitle;
  private String topicDescription;
  private int topicViews;
  private int postsCount;

  private String latestPostUid;
  private String latestPostDate;
}
