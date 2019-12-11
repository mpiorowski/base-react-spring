package base.api.services.forum;

import base.api.domain.forum.breadcrumbs.BreadcrumbsDao;
import base.api.domain.forum.breadcrumbs.BreadcrumbsEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BreadcrumbService {

  private BreadcrumbsDao dao;

  public BreadcrumbService(BreadcrumbsDao dao) {
    this.dao = dao;
  }

  public List<BreadcrumbsEntity> findAll() {
    return dao.findAll();
  }
}
