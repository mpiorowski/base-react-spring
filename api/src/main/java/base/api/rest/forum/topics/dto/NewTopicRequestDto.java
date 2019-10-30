package base.api.rest.forum.topics.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class NewTopicRequestDto {

  @NotBlank
  @Size(min = 1, max = 100)
  private String topicTitle;

  @Size(max = 400)
  private String topicDescription;
}
