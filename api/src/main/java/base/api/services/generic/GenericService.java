package base.api.services.generic;

import base.api.domain.generic.ResponseDao;
import base.api.domain.user.UserEntity;
import base.api.security.SystemUser;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public abstract class GenericService<E> {

  protected UserEntity currentUserEntity() {
    SystemUser systemUser = currentUser();
    return systemUser.getUser();
  }

  protected SystemUser currentUser() {
    return (SystemUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  protected Boolean checkRole(String role) {
    var user = (SystemUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    return user.getAuthorities().contains(new SimpleGrantedAuthority(role));
  }

  @Transactional(readOnly = true)
  public abstract List<E> findAll();

  @Transactional(readOnly = true)
  public abstract Optional<E> findByUid(String uid);

  @Transactional
  public abstract Optional<E> add(E entity);

  @Transactional
  public abstract Optional<E> edit(E entity);

  @Transactional
  public abstract boolean delete(String uid);
}
