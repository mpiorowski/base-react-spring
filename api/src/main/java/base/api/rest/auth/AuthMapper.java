package base.api.rest.auth;

import base.api.config.mapper.MappersConfig;
import base.api.domain.user.UserEntity;
import base.api.rest.auth.dto.RegisterRequestDto;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Service;

@Mapper(config = MappersConfig.class)
@Service
public interface AuthMapper {

  UserEntity registerRequestToUserEntity(RegisterRequestDto registerRequestDto);
}
