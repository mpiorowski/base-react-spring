package base.api.config.mapper;

import base.api.utils.UtilsStringConversions;

import java.util.UUID;

public class UUIDMapper {
  public String map(UUID uid) {
    return UtilsStringConversions.uidEncode(uid);
  }

  public UUID map(String uid) {
    return uid != null ? UtilsStringConversions.uidDecode(uid) : null;
  }
}
