package base.api.utils;

import org.springframework.security.crypto.bcrypt.BCrypt;

import java.security.SecureRandom;

public class UtilsString {
  private UtilsString() {}
  private static SecureRandom secureRandom = new SecureRandom();

  public static boolean isBlank(String string) {
    return string == null || string.isBlank();
  }

  public static String generateSecureNumber(int maxRange) {
    return String.format("%04d", secureRandom.nextInt(maxRange));
  }

  public static String encodeString(String str) {
    return BCrypt.hashpw(str, BCrypt.gensalt());
  }

  public static boolean compareEncodedStrings(String plainStr, String encodedStr) {
    return BCrypt.checkpw(plainStr, encodedStr);
  }

}
