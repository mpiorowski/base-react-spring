package base.api.rest.error;

import base.api.config.StorageConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileOutputStream;
import java.io.IOException;
import java.time.Instant;

@RestController
@RequestMapping("/api/error")
public class ErrorController {

  private static final Logger logger = LoggerFactory.getLogger(ErrorController.class);

  private StorageConfig storageConfig;

  public ErrorController(StorageConfig storageConfig) {
    this.storageConfig = storageConfig;
  }

  @PostMapping
  public void saveErrorToLog(@RequestBody ErrorDto errorDto) {

    String now = Instant.now().toString();
    String str =
        now
            + ": "
            + "\r\n"
            + errorDto.getMessage()
            + "\r\n"
            + errorDto.getStack()
            + "\r\n"
            + errorDto.getComponentStack();
    String fileName = storageConfig.getLocation() + "logs/ui.log";
    try (FileOutputStream oFile = new FileOutputStream(fileName, true)) {
      byte[] strToBytes = str.getBytes();
      oFile.write(strToBytes);
    } catch (IOException e) {
      logger.error(e.getMessage());
    }
  }
}
