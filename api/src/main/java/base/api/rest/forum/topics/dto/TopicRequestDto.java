package base.api.rest.forum.topics.dto;

import lombok.Data;

@Data
public class TopicRequestDto {

//  TODO - validate CAT/TOP/POST
  private String topicTitle;
  private String topicDescription;
}
