package base.api.rest.forum.posts.dto;

import base.api.domain.user.UserEntity;
import base.api.rest.generic.GenericResponseDto;
import base.api.rest.users.UserDataDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PostDataDto extends GenericResponseDto {

  private String postContent;
  private UserDataDto postAuthor;
  private String replyUid;
}
