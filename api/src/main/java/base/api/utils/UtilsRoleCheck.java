package base.api.utils;

import base.api.config.AppConstants;
import base.api.security.SystemUser;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

public class UtilsRoleCheck {

  public static boolean isRole(AppConstants.RoleName role) {
    SystemUser user =
        (SystemUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return user.getAuthorities().contains(new SimpleGrantedAuthority(role.toString()));
  }
}
