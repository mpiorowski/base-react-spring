package base.api.logging;

import base.api.config.AppConstants;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;

import java.util.Arrays;

@Aspect
public class AopLogging {

  private static final Logger LOGGER = LoggerFactory.getLogger(AopLogging.class);
  private final Environment env;

  public AopLogging(Environment env) {
    this.env = env;
  }

  /** Pointcut that matches all repositories, services and Web REST endpoints. */
  @Pointcut(
      //            "within(@org.springframework.stereotype.Service *) || "
      //                + "within(@org.apache.ibatis.annotations.Mapper *) || "
      "within(@org.springframework.web.bind.annotation.RestController *)")
  public void springBeanPointcut() {
    // Method is empty as this is just a Pointcut, the implementations are in the advices.
  }

  /** Pointcut that matches all Spring beans in the application's main packages. */
  @Pointcut("within(base.api.rest.diaries.*)")
  public void applicationPackagePointcut() {
    // Method is empty as this is just a Pointcut, the implementations are in the advices.
  }

  /**
   * Advice that logs methods throwing exceptions.
   *
   * @param joinPoint join point for advice
   * @param e exceptions
   */
  @AfterThrowing(pointcut = "applicationPackagePointcut() || springBeanPointcut()", throwing = "e")
  public void logAfterThrowing(JoinPoint joinPoint, Throwable e) {
    if (env.acceptsProfiles(Profiles.of(AppConstants.Profiles.SPRING_PROFILE_DEVELOPMENT))) {
      LOGGER.error(
          "Exception in {}.{}() with cause = \'{}\' and exceptions = \'{}\'",
          joinPoint.getSignature().getDeclaringTypeName(),
          joinPoint.getSignature().getName(),
          e.getCause() != null ? e.getCause() : "NULL",
          e.getMessage(),
          e);

    } else {
      LOGGER.error(
          "Exception in {}.{}() with cause = {}",
          joinPoint.getSignature().getDeclaringTypeName(),
          joinPoint.getSignature().getName(),
          e.getCause() != null ? e.getCause() : "NULL");
    }
  }

  /**
   * Advice that logs when a method is entered and exited.
   *
   * @param joinPoint join point for advice
   * @return result
   * @throws Throwable throws IllegalArgumentException
   */
  @Around("applicationPackagePointcut() || springBeanPointcut()")
  public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {
    try {
      String joinPointStr = Arrays.toString(joinPoint.getArgs());
      LOGGER.debug(
          "Enter: {}.{}() with argument[s] = {}",
          joinPoint.getSignature().getDeclaringTypeName(),
          joinPoint.getSignature().getName(),
          joinPointStr);
      Object result = joinPoint.proceed();
      LOGGER.debug(
          "Exit: {}.{}() with result = {}",
          joinPoint.getSignature().getDeclaringTypeName(),
          joinPoint.getSignature().getName(),
          result);

      return result;
    } catch (IllegalArgumentException e) {
      LOGGER.error(
          "Illegal argument: {} in {}.{}()",
          Arrays.toString(joinPoint.getArgs()),
          joinPoint.getSignature().getDeclaringTypeName(),
          joinPoint.getSignature().getName());

      throw e;
    }
  }

  /**
   * Advice that logs time of execution of tagged method.
   *
   * @param joinPoint join point for advice
   * @return result
   * @throws Throwable throws IllegalArgumentException
   */
  @Around("@annotation(base.api.logging.LogExecutionTime)")
  public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
    long start = System.currentTimeMillis();
    Object proceed = joinPoint.proceed();
    long executionTime = System.currentTimeMillis() - start;
    LOGGER.debug("{} executed in {}ms", joinPoint.getSignature(), executionTime);
    return proceed;
  }
}
