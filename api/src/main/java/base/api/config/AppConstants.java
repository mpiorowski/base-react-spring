package base.api.config;

public final class AppConstants {

  public static final class Profiles {
    private Profiles() {}

    public static final String SPRING_PROFILE_DEVELOPMENT = "dev";
    public static final String SPRING_PROFILE_TEST = "test";
    public static final String SPRING_PROFILE_PRODUCTION = "prod";
    public static final String SPRING_PROFILE_DEFAULT = "spring.profiles.default";
    public static final String SPRING_PROFILE_ACTIVE = "spring.profiles.active";
  }

  public static final class TokenTypes {

    public static final String REGISTER_TOKEN = "register-token";
    public static final String RECOVER_TOKEN = "recover-token";

  }

  public enum RoleName {
    ROLE_SUPER,
    ROLE_ADMIN,
    ROLE_USER,
    ROLE_CLIENT
  }
}
