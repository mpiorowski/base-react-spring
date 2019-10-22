package base.api.rest.forum.topics.dto;

import base.api.rest.generic.GenericResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class TopicDataDto extends GenericResponseDto {
  private String topicTitle;
  private int topicViews;
}
