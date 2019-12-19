package base.api.rest.forum.breadcrumbs;

import lombok.Data;

@Data
public class BreadcrumbsDataDto {

  private String categoryUid;
  private String categoryTitle;
  private String topicUid;
  private String topicTitle;

}
