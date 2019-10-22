package base.api.rest.forum.posts;

import base.api.config.mapper.MappersConfig;
import base.api.domain.forum.posts.PostEntity;
import base.api.rest.forum.posts.dto.PostDataDto;
import base.api.rest.forum.posts.dto.PostReplyDto;
import base.api.rest.forum.posts.dto.PostRequestDto;
import base.api.rest.forum.topics.dto.NewTopicRequestDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Service;

@Mapper(config = MappersConfig.class)
@Service
public interface PostMapper {

  PostEntity dtoToEntity1(NewTopicRequestDto dto);

  PostEntity dtoToEntity2(PostRequestDto dto);

  //  TODO - use whole user object
  @Mapping(target = "postAuthor", source = "postAuthor.userName")
  PostDataDto entityToDataDto(PostEntity entity);

  //  TODO - use whole user object
  @Mapping(target = "postAuthor", source = "postAuthor.userName")
  PostReplyDto entityToReplyDto(PostEntity entity);
}
