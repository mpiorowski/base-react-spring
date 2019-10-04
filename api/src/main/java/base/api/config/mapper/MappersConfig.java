package base.api.config.mapper;

import org.mapstruct.MapperConfig;
import org.mapstruct.ReportingPolicy;

@MapperConfig(
    uses = {UUIDMapper.class},
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MappersConfig {}
