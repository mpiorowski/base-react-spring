package base.api.rest.forum.posts;

import base.api.config.mapper.MappersConfig;
import base.api.domain.forum.posts.PostEntity;
import base.api.rest.forum.posts.dto.PostDataDto;
import base.api.rest.forum.posts.dto.PostRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Service;

@Mapper(config = MappersConfig.class)
@Service
public interface PostMapper {

  PostEntity requestDtoToEntity(PostRequestDto dto);

  PostDataDto entityToDataDto(PostEntity entity);
}
