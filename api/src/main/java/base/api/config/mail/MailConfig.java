package base.api.config.mail;

import lombok.Data;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@ConfigurationProperties(prefix = "mail", ignoreUnknownFields = false)
@Data
public class MailConfig {

  private String host;
  private Integer port;
  private String username;
  private String password;
  private String from;

  private String defaultEncoding = "UTF-8";

  private String smtpStarttlsEnable = "true";
  private String transportProtocol = "smtp";
  private String smtpAuth = "true";
  private String debug = "true";
  private String connectiontimeout = "true";
  private String timeout = "true";
  private String writetimeout = "true";

  @Bean
  public JavaMailSender getJavaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();

    mailSender.setHost(host);
    mailSender.setPort(port);
    mailSender.setUsername(username);
    mailSender.setPassword(password);

    mailSender.setDefaultEncoding(defaultEncoding);

    Properties props = mailSender.getJavaMailProperties();
    props.put("mail.transport.protocol", transportProtocol);
    props.put("mail.smtp.auth", smtpAuth);
    props.put("mail.smtp.starttls.enable", smtpStarttlsEnable);
    props.put("mail.smtp.connectiontimeout", connectiontimeout);
    props.put("mail.smtp.timeout", timeout);
    props.put("mail.smtp.writetimeout", writetimeout);
    props.put("mail.debug", debug);

    return mailSender;
  }
}
