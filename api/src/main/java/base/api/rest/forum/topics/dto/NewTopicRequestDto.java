package base.api.rest.forum.topics.dto;

import lombok.Data;

@Data
public class NewTopicRequestDto {
	private String topicTitle;
	private String postContent;
}
