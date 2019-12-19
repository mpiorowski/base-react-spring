package base.api.rest.forum.categories.dto;

import lombok.Data;

@Data
public class CategoryAdditionalDto {

  private Integer categoryTopicsNumber;
  private Integer categoryPostsNumber;

  private String categoryLatestTopic;
  private String categoryLatestTopicUid;

  private String categoryLatestPostUid;
  private String categoryLatestPost;
  private String categoryLatestPostAuthor;
  private String categoryLatestPostDate;
}
