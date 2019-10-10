package base.api.config.mail;

public class MessagesConfig {

  private MessagesConfig() {}

  public static class WelcomeMessage {
    public static final String HEADER = "Witamy!";

    private WelcomeMessage() {}

    public static String message(String userName, String userEmail) {
      return String.format(
          "<p>Witamy Ciebie w naszej cudownej, najlepszej, najwspanialszej aplikacji na świecie!</p>"
              + "<p>Twoja nazwa użytkownika: %s </p>"
              + "<p>Twój email: %s </p>"
              + "<p>PS. Agatka jest najcudowniejszą dziewczyną pod słońcem</p>"
              + "<p>PSS. Wróć, Najwspanialszą na świecie!!</p>"
              + "<p>PSSS. Wróć! Wróć! Najwspanialszą we wszechświecie :******* !!</p>",
          userName, userEmail);
    }
  }
}
