package base.api.config;

import base.api.security.JwtAuthenticationEntryPoint;
import base.api.security.JwtAuthenticationFilter;
import base.api.security.JwtAuthenticationTokenProvider;
import base.api.security.SystemUserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

  private final SystemUserService systemUserService;
  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
  private final CorsFilter corsFilter;
  private final JwtAuthenticationTokenProvider tokenProvider;

  public SecurityConfig(
      SystemUserService systemUserService,
      JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
      CorsFilter corsFilter,
      JwtAuthenticationTokenProvider tokenProvider) {
    this.systemUserService = systemUserService;
    this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    this.corsFilter = corsFilter;
    this.tokenProvider = tokenProvider;
  }

  @Bean
  public JwtAuthenticationFilter jwtAuthenticationFilter() {
    return new JwtAuthenticationFilter(tokenProvider, systemUserService);
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean(BeanIds.AUTHENTICATION_MANAGER)
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  @Override
  protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder)
      throws Exception {
    authenticationManagerBuilder
        .userDetailsService(systemUserService)
        .passwordEncoder(passwordEncoder());
  }

  @Override
  protected void configure(HttpSecurity httpSecurity) throws Exception {
    httpSecurity
        .cors()
        .and()
        .csrf()
        .disable()
        .exceptionHandling()
        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
        .and()
        .headers()
        .frameOptions()
        .disable()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
        .antMatchers(
            "/",
            "/favicon.ico",
            "/**/*.png",
            "/**/*.gif",
            "/**/*.svg",
            "/**/*.jpg",
            "/**/*.html",
            "/**/*.css",
            "/**/*.js")
        .permitAll()
        .antMatchers("/api/auth/**")
        .permitAll()
        .antMatchers("/api/test/**")
        .permitAll()
        .antMatchers("/api/**")
        .authenticated()
        .antMatchers("/management/health")
        .permitAll()
        .antMatchers("/management/info")
        .permitAll()
        .antMatchers("/management/**")
        .hasAuthority(AppConstants.RoleName.ROLE_ADMIN.toString())
        .anyRequest()
        .authenticated();

    httpSecurity.addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class);
    httpSecurity.addFilterBefore(
        jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
  }

  @Override
  public void configure(WebSecurity web) {
    web.ignoring()
        .antMatchers(HttpMethod.OPTIONS, "/**")
        .antMatchers("/swagger-ui/index.html")
        .antMatchers("/test/**");
  }
}
