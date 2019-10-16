package base.api.test;

import base.api.domain.AuthDao;
import base.api.services.mail.MailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("/api/test")
public class TestMail {

  private static final Logger logger = LoggerFactory.getLogger(TestMail.class);

  private JavaMailSender javaMailSender;
  private MailService mailService;
  private AuthDao authDao;

  public TestMail(JavaMailSender javaMailSender, MailService mailService, AuthDao authDao) {
    this.javaMailSender = javaMailSender;
    this.mailService = mailService;
    this.authDao = authDao;
  }

  @GetMapping("/mail1")
  public void sendSimpleMail() {
    SimpleMailMessage msg = new SimpleMailMessage();
    msg.setTo("mateuszpiorowski@gmail.com");

    msg.setSubject("Testing from Spring Boot");
    msg.setText("Hello World \n Spring Boot Email");

    javaMailSender.send(msg);
  }

  @GetMapping("/mail2")
  public void sendHtmlMail() throws MessagingException, UnsupportedEncodingException {
//    mailService.sendHtmlMail(
//        "mateuszpiorowski@gmail.com",
//        MessagesConfig.WelcomeMessage.header,
//        MessagesConfig.WelcomeMessage.message);
  }
}
