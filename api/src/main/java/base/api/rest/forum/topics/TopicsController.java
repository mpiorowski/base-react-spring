package base.api.rest.forum.topics;

import base.api.domain.forum.categories.CategoryEntity;
import base.api.domain.forum.topics.TopicEntity;
import base.api.domain.forum.topics.TopicWithPostsEntity;
import base.api.logging.LogExecutionTime;
import base.api.rest.forum.categories.CategoryMapper;
import base.api.rest.forum.categories.dto.CategoryRespondDto;
import base.api.rest.forum.topics.dto.TopicDataDto;
import base.api.rest.forum.topics.dto.TopicRequestDto;
import base.api.rest.forum.topics.dto.TopicResponseDto;
import base.api.rest.forum.topics.dto.TopicsResponseDto;
import base.api.services.forum.CategoryService;
import base.api.services.forum.PostService;
import base.api.services.forum.TopicService;
import base.api.utils.UtilsUid;
import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/forum/categories/{categoryUid}/topics")
public class TopicsController {

  private final CategoryService categoryService;
  private final TopicService topicService;
  private final PostService postService;

  private CategoryMapper categoryMapper = Mappers.getMapper(CategoryMapper.class);
  private TopicMapper topicMapper = Mappers.getMapper(TopicMapper.class);

  public TopicsController(
      CategoryService categoryService, TopicService topicService, PostService postService) {
    this.categoryService = categoryService;
    this.topicService = topicService;
    this.postService = postService;
  }

  /**
   * GET / : find all topics by parent category uid
   *
   * @param categoryUid uid of the parent category
   * @return TopicsResponseDto object with list of all topics by category uid
   */
  @GetMapping()
  public ResponseEntity<TopicsResponseDto> findTopics(
      @PathVariable("categoryUid") String categoryUid) {

    Optional<CategoryEntity> category = categoryService.findByUid(categoryUid);

    if (category.isPresent()) {
      CategoryRespondDto categoryRespondDto = categoryMapper.entityToRespondDto(category.get());
      List<TopicWithPostsEntity> topics =
          topicService.findTopicsWithPostsByCategoryId(category.get().getId());

      List<TopicResponseDto> topicsDto =
          topics.stream()
              .map(
                  topic -> {
                    Integer topicId = topic.getId();
                    int postsCount = postService.countPostsByTopicId(topicId);
                    TopicResponseDto topicResponseDto = topicMapper.topicEntityWithPostToDto(topic);
                    topicResponseDto.setPostsCount(postsCount);
                    return topicResponseDto;
                  })
              .collect(Collectors.toList());

      TopicsResponseDto topicsResponseDto = new TopicsResponseDto(categoryRespondDto, topicsDto);
      return ResponseEntity.ok(topicsResponseDto);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  /**
   * GET / : find topic by uid
   *
   * @param categoryUid uid of the parent category
   * @param topicUid uid of the topic
   * @return TopicResponseDto object
   */
  @GetMapping("/{topicUid}")
  public ResponseEntity<TopicResponseDto> findTopicByUid(
      @PathVariable("categoryUid") String categoryUid, @PathVariable("topicUid") String topicUid) {

    Optional<CategoryEntity> category = categoryService.findByUid(categoryUid);

    if (category.isPresent()) {
      Optional<TopicEntity> topic = topicService.findByUid(topicUid);
      if (topic.isPresent()) {
        int postsCount = postService.countPostsByTopicId(topic.get().getId());
        TopicResponseDto topicResponseDto = topicMapper.entityToDto(topic.get());
        topicResponseDto.setPostsCount(postsCount);
        return ResponseEntity.ok(topicResponseDto);
      }
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  /**
   * POST / : add topic
   *
   * @param categoryUid uid of the parent category
   * @param newTopicRequestDto object with topic data and the initial post created alongside it
   * @return NewTopicResponseDto object with the uid of both the topic and post
   */
  @PostMapping()
  public ResponseEntity<TopicDataDto> addTopic(
      @PathVariable("categoryUid") String categoryUid,
      @Valid @RequestBody TopicRequestDto topicRequestDto) {

    Optional<CategoryEntity> categoryEntity = categoryService.findByUid(categoryUid);
    if (categoryEntity.isPresent()) {
      TopicEntity topicEntity = topicMapper.requestDtoToEntity(topicRequestDto);
      topicEntity.setTopicCategory(categoryEntity.get().getId());
      Optional<TopicEntity> topic = topicService.add(topicEntity);
      if (topic.isPresent()) {
        TopicDataDto topicDataDto = topicMapper.entityToDataDto(topic.get());
        return new ResponseEntity<>(topicDataDto, HttpStatus.OK);
      } else {
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  /**
   * PUT / : edit topic
   *
   * @param categoryUid uid of the parent category
   * @param topicUid uid of the topic
   * @param topicRequestDto object with topic data
   * @return void
   */
  @PutMapping("/{topicUid}")
  public ResponseEntity<TopicDataDto> editTopic(
      @PathVariable("categoryUid") String categoryUid,
      @PathVariable("topicUid") String topicUid,
      @Valid @RequestBody TopicRequestDto topicRequestDto) {

    Optional<CategoryEntity> category = categoryService.findByUid(categoryUid);
    if (category.isPresent()) {
      TopicEntity topic = topicMapper.requestDtoToEntity(topicRequestDto);
      topic.setUid(UtilsUid.uidDecode(topicUid));
      var topicEntity = topicService.edit(topic);
      if (topicEntity.isPresent()) {
        TopicDataDto topicDataDto = topicMapper.entityToDataDto(topicEntity.get());
        return new ResponseEntity<>(topicDataDto, HttpStatus.OK);
      }
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  /**
   * DELETE / : delete topic
   *
   * @param topicUid uid of the topic
   * @return void
   */
  @LogExecutionTime
  @DeleteMapping("/{topicUid}")
  public ResponseEntity deleteTopic(@PathVariable("topicUid") String topicUid) {
    topicService.delete(topicUid);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  /**
   * PATCH / : activate/deactivate topic
   *
   * @param topicUid uid of the topic
   * @return void
   */
  @LogExecutionTime
  @PatchMapping("/{topicUid}")
  public ResponseEntity changeStatusTopic(@PathVariable("topicUid") String topicUid) {
    topicService.changeStatus(topicUid);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
