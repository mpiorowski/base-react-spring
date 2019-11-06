package base.api.rest.forum.topics;

import base.api.config.mapper.MappersConfig;
import base.api.domain.forum.topics.TopicEntity;
import base.api.rest.forum.topics.dto.EditTopicRequestDto;
import base.api.rest.forum.topics.dto.NewTopicRequestDto;
import base.api.rest.forum.topics.dto.TopicDataDto;
import base.api.rest.forum.topics.dto.TopicResponseDto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Service;

@Mapper(config = MappersConfig.class)
@Service
public interface TopicMapper {

  TopicDataDto entityToDataDto(TopicEntity entity);

  TopicResponseDto entityToDto(TopicEntity entity);

  TopicEntity newDtoToEntity(NewTopicRequestDto dto);

  TopicEntity dtoToEntity2(EditTopicRequestDto dto);
}
