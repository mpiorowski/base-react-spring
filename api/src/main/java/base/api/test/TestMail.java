package base.api.test;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@RestController
@RequestMapping("/api/test")
public class TestMail {

  private JavaMailSender javaMailSender;

  public TestMail(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
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
  public void sendHtmlMail() throws MessagingException {
    MimeMessage msg = javaMailSender.createMimeMessage();

    // true = multipart message
    MimeMessageHelper helper = new MimeMessageHelper(msg, true);

    helper.setTo("mateuszpiorowski@gmail.com");

    helper.setSubject("Testing from Spring Boot");


    // true = text/html
    helper.setText("<h1>Check attachment for image!</h1>", true);

    // hard coded a file path
    //FileSystemResource file = new FileSystemResource(new File("path/android.png"));

    helper.addAttachment("my_photo.png", new ClassPathResource("pbs-logo.png"));

    javaMailSender.send(msg);
  }
}
