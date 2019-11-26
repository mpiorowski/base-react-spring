package base.api.rest.forum.posts.dto;

import base.api.rest.forum.topics.dto.TopicDataDto;
import lombok.Data;

import java.util.List;

@Data
public class PostsResponseDto {
  private TopicDataDto topic;
  private List<PostDataDto> posts;
}
