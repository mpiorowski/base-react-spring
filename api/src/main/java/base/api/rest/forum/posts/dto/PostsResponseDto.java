package base.api.rest.forum.posts.dto;

import base.api.rest.forum.categories.dto.CategoryDataDto;
import base.api.rest.forum.topics.dto.TopicDataDto;
import lombok.Data;

import java.util.List;

@Data
public class PostsResponseDto {
  private CategoryDataDto category;
  private TopicDataDto topic;
  private List<PostDataDto> posts;
}
