package base.api.domain.forum.categories;

import lombok.Data;

@Data
public class CategoryNewestEntity {
  private String categoryNewestTopic;
  private String categoryNewestPost;
  private String categoryNewestPostAuthor;
  private String categoryNewestPostDate;
}
