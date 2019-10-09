package base.api.services.mail;

import base.api.config.mail.MailConfig;
import base.api.utils.UtilsString;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;

@Service
public class MailService {

  private JavaMailSender javaMailSender;
  private MailConfig mailConfig;

  public MailService(JavaMailSender javaMailSender, MailConfig mailConfig) {
    this.javaMailSender = javaMailSender;
    this.mailConfig = mailConfig;
  }

  public void sendHtmlMail(String to, String header, String message) throws MessagingException, UnsupportedEncodingException {

    MimeMessage msg = javaMailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(msg, true);
    helper.setFrom(mailConfig.getUsername(), mailConfig.getFrom());
    helper.setTo(to);

    helper.setSubject(header);
    helper.setText(message, true);

    helper.addAttachment("my_photo.png", new ClassPathResource("pbs-logo.png"));

    javaMailSender.send(msg);
  }
}
