package base.api.rest.forum.topics.dto;

import base.api.domain.forum.NewestEntity;
import base.api.rest.generic.GenericResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TopicResponseDto extends GenericResponseDto {

  private String topicTitle;
  private int topicViews;
  private int postsCount;
  private NewestEntity newestPost;

}
