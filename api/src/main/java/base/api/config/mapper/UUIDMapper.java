package base.api.config.mapper;

import base.api.utils.UtilsUid;

import java.util.UUID;

public class UUIDMapper {
  public String map(UUID uid) {
    return uid != null ? UtilsUid.uidEncode(uid) : null;
  }

  public UUID map(String uid) {
    return uid != null ? UtilsUid.uidDecode(uid) : null;
  }
}
