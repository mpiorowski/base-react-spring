package base.api.rest.forum.posts.dto;

import lombok.Data;

@Data
public class PostRequestDto {
  private String postContent;
  private String replyUid;
}
