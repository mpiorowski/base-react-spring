package base.api.domain.forum.posts;

import base.api.domain.generic.GenericEntity;
import base.api.domain.user.UserEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Data
public class PostEntity extends GenericEntity {

  private String postContent;
  private Integer topicId;
  private UUID replyUid;
  private UserEntity postAuthor;
}
