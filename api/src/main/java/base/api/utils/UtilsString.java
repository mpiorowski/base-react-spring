package base.api.utils;

public class UtilsString {
  private UtilsString() {}
  public static boolean isBlank(String string) {
    return string == null || string.isBlank();
  }
}
