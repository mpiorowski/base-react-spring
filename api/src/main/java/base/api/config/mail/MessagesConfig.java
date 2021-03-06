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

  public static class RegisterTokenMessage {
    public static final String HEADER = "Twój kod autoryzacyjny";

    private RegisterTokenMessage() {}

    public static String message(String code) {
      return String.format("<p>Poniżej przesyłamy Twój kod do autoryzacji:</p><h1>%s</h1>", code);
    }
  }

  public static class RecoverMessage {
    public static final String HEADER_CODE = "Zmiana hasła";
    public static final String HEADER_RECOVER = "Poprawnie zmiano hasło";

    private RecoverMessage() {}

    public static String messageCode(String code) {
      return String.format(
          "<p>Poniżej przesyłamy Twój kod do zmiany hasła:</p>"
              + "<h1>%s</h1>"
              + "<p>Jeżeli nie chciałeś zmienić hasła, zignoruj tą wiadomość. Bardzo możliwe, że ktoś przypadkowo źle wpisał swoje dane.",
          code);
    }

    public static String messageRecover(String userName, String userEmail) {
      return String.format(
          "<p>Hasło do Twojego konta zostało zmienione poprawnie</p>"
              + "<p>Twoja nazwa użytkownika: %s </p>"
              + "<p>Twój email: %s </p>"
              + "<p>Jeżeli nie chciałeś zmienić hasła, skontaktuj się z nami jak najszybciej.",
          userName, userEmail);
    }
  }
}
