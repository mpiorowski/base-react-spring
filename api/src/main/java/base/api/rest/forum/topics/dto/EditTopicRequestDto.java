package base.api.rest.forum.topics.dto;

import lombok.Data;

@Data
public class EditTopicRequestDto {
  private String topicTitle;
  private String topicDescription;
}
