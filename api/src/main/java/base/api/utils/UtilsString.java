package base.api.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.security.SecureRandom;

public class UtilsString {
  private UtilsString() {}
  private static SecureRandom secureRandom = new SecureRandom();

  public static boolean isBlank(String string) {
    return string == null || string.isBlank();
  }

  //TODO - add zero depending on max range
  public static String generateSecureNumber(int maxRange) {
    String format = "%0"+maxRange+"d";
    return String.format(format, secureRandom.nextInt(maxRange));
  }

  public static String encodeString(String str) {
    return BCrypt.hashpw(str, BCrypt.gensalt());
  }

  public static boolean compareEncodedStrings(String plainStr, String encodedStr) {
    return BCrypt.checkpw(plainStr, encodedStr);
  }

  public static boolean compareJsonToObject(String json, Object object) throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    return object.equals(objectMapper.readValue(json, object.getClass()));
  }

}
