package base.api.domain.forum.breadcrumbs;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface BreadcrumbsDao {
  @Select(
      "select "
          + "c.uid as categoryUid, c.category_title as categoryTitle, "
          + "t.uid as topicUid, t.topic_title as topicTitle "
          + "from forum_categories c join forum_topics t on fk_category_id = c.id")
  List<BreadcrumbsEntity> findAll();
}
