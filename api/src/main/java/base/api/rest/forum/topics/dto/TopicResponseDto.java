package base.api.rest.forum.topics.dto;

import base.api.domain.forum.NewestEntity;
import base.api.rest.generic.GenericResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

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
