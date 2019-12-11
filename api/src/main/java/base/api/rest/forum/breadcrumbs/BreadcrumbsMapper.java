package base.api.rest.forum.breadcrumbs;

import base.api.config.mapper.MappersConfig;
import base.api.domain.forum.breadcrumbs.BreadcrumbsEntity;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Service;

@Mapper(config = MappersConfig.class)
@Service
public interface BreadcrumbsMapper {

  BreadcrumbsDataDto entityToRespondDto(BreadcrumbsEntity breadcrumbsEntity);
}
