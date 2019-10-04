package base.api.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

@Configuration
@EnableScheduling
public class SchedulerConfig implements SchedulingConfigurer {

  private AppConfig appConfig;
  public SchedulerConfig(AppConfig appConfig) {
    this.appConfig = appConfig;
  }

  @Override
  public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
    ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();

    threadPoolTaskScheduler.setPoolSize(appConfig.getScheduler().getCorePoolSize());
    threadPoolTaskScheduler.setThreadNamePrefix(appConfig.getScheduler().getThreadNamePrefix());
    threadPoolTaskScheduler.initialize();

    taskRegistrar.setTaskScheduler(threadPoolTaskScheduler);
  }
}
