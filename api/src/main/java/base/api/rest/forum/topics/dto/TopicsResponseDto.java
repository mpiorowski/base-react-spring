package base.api.rest.forum.topics.dto;

import base.api.rest.forum.categories.dto.CategoryRespondDto;
import lombok.Data;

import java.util.List;

@Data
public class TopicsResponseDto {

  private final CategoryRespondDto category;
  private final List<TopicResponseDto> topics;
}
