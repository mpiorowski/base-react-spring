package base.api.domain.forum.categories;

import lombok.Data;

import java.util.UUID;

@Data
public class CategoryLatestEntity {

  private UUID categoryLatestTopicUid;
  private String categoryLatestTopic;

  private UUID categoryLatestPostUid;
  private String categoryLatestPost;
  private String categoryLatestPostAuthor;
  private String categoryLatestPostDate;
}
