package base.api.utils;

import lombok.Getter;

import java.nio.ByteBuffer;
import java.util.Base64;
import java.util.UUID;

@Getter
public class UtilsStringConversions {

  private UtilsStringConversions() {}

  public static String uidEncode(UUID uid) {
    String sUid = Base64.getUrlEncoder().encodeToString(getBytesFromUUID(uid));
    return sUid.split("=")[0];
  }

  public static UUID uidDecode(String uid) {
    byte[] bb = Base64.getUrlDecoder().decode(uid);
    return getUUIDFromBytes(bb);
  }

  private static byte[] getBytesFromUUID(UUID uuid) {
    ByteBuffer bb = ByteBuffer.wrap(new byte[16]);
    bb.putLong(uuid.getMostSignificantBits());
    bb.putLong(uuid.getLeastSignificantBits());

    return bb.array();
  }

  private static UUID getUUIDFromBytes(byte[] bytes) {
    ByteBuffer bb = ByteBuffer.wrap(bytes);
    long firstLong = bb.getLong();
    long secondLong = bb.getLong();
    return new UUID(firstLong, secondLong);
  }
}
