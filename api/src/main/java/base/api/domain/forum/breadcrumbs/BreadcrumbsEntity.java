package base.api.domain.forum.breadcrumbs;

import lombok.Data;

import java.util.UUID;

@Data
public class BreadcrumbsEntity {
  private UUID categoryUid;
  private String categoryTitle;
  private UUID topicUid;
  private String topicTitle;
}
