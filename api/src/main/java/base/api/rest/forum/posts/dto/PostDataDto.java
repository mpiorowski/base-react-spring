package base.api.rest.forum.posts.dto;

import base.api.rest.generic.GenericResponseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class PostDataDto extends GenericResponseDto {

  private String postContent;
  private String postAuthor;
  private List<PostReplyDto> postReplies;
}
