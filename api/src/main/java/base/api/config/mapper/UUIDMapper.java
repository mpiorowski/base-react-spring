package base.api.config.mapper;

import base.api.utils.UtilsUid;

import java.util.UUID;

public class UUIDMapper {
  public String map(UUID uid) {
    return UtilsUid.uidEncode(uid);
  }

  public UUID map(String uid) {
    return uid != null ? UtilsUid.uidDecode(uid) : null;
  }
}
