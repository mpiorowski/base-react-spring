package base.api.utils;

public class Utils {

  public static boolean isNotEmpty(Object object) {
    return object != null && !object.toString().equals("");
  }
}
