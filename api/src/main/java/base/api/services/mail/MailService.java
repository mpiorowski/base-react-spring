package base.api.services.mail;

import base.api.config.mail.MailConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class MailService {

  private static final Logger logger = LoggerFactory.getLogger(MailService.class);
  private JavaMailSender javaMailSender;
  private MailConfig mailConfig;

  public MailService(JavaMailSender javaMailSender, MailConfig mailConfig) {
    this.javaMailSender = javaMailSender;
    this.mailConfig = mailConfig;
  }

  @Async
  public void sendHtmlMail(String to, String header, String message) {
    logger.info("Execute method asynchronously - {}", Thread.currentThread().getName());
    try {
      MimeMessage msg = javaMailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(msg, true);
      helper.setFrom(mailConfig.getUsername(), mailConfig.getFrom());
      helper.setTo(to);
      helper.setSubject(header);
      helper.setText(message, true);
      //    helper.addAttachment("my_photo.png", new ClassPathResource("pbs-logo.png"));
      javaMailSender.send(msg);
      logger.info("Finished method asynchronously - {}", Thread.currentThread().getName());
    } catch (UnsupportedEncodingException | MessagingException e) {
      logger.error("Async method error - {}", e.getMessage());
    }
  }
}
