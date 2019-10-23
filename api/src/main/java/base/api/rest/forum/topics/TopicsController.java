package base.api.rest.forum.topics;

import base.api.domain.forum.NewestEntity;
import base.api.domain.forum.categories.CategoryEntity;
import base.api.domain.forum.posts.PostEntity;
import base.api.domain.forum.topics.TopicEntity;
import base.api.logging.LogExecutionTime;
import base.api.rest.forum.categories.CategoryMapper;
import base.api.rest.forum.categories.dto.CategoryRespondDto;
import base.api.rest.forum.posts.PostMapper;
import base.api.rest.forum.topics.dto.*;
import base.api.services.forum.CategoryService;
import base.api.services.forum.PostService;
import base.api.services.forum.TopicService;
import base.api.utils.UtilsStringConversions;
import org.mapstruct.factory.Mappers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

  private static final Logger logger = LoggerFactory.getLogger(TopicsController.class);

  private final CategoryService categoryService;
  private final TopicService topicService;
  private final PostService postService;

  private CategoryMapper categoryMapper = Mappers.getMapper(CategoryMapper.class);
  private TopicMapper topicMapper = Mappers.getMapper(TopicMapper.class);
  private PostMapper postMapper = Mappers.getMapper(PostMapper.class);

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
      CategoryRespondDto categoryRespondDto = categoryMapper.entityToDto(category.get());
      List<TopicEntity> topics = topicService.findTopicsByCategoryId(category.get().getId());

      List<TopicResponseDto> topicsDto =
          topics.stream()
              .map(
                  topic -> {
                    Integer topicId = topic.getId();
                    int postsCount = postService.countPostsByTopicId(topicId);
                    TopicResponseDto topicResponseDto = topicMapper.entityToDto(topic);
                    topicResponseDto.setPostsCount(postsCount);
                    if(postService.findNewestByTopicId(topicId).isPresent()) {
                      topicResponseDto.setNewestPost(postService.findNewestByTopicId(topicId).get());
                    }
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
  public ResponseEntity<NewTopicResponseDto> addTopic(
      @PathVariable("categoryUid") String categoryUid,
      @Valid @RequestBody NewTopicRequestDto newTopicRequestDto) {
    try {
      Optional<CategoryEntity> category = categoryService.findByUid(categoryUid);
      if (category.isPresent()) {

        TopicEntity topic = topicMapper.dtoToEntity1(newTopicRequestDto);
        topic.setTopicCategory(category.get().getId());
        String topicUid = topicService.add(topic);

        Optional<TopicEntity> newTopic = topicService.findByUid(topicUid);

        if (newTopic.isPresent()) {
          PostEntity post = postMapper.dtoToEntity1(newTopicRequestDto);
          post.setTopicId(newTopic.get().getId());
          String postUid = postService.add(post);

          NewTopicResponseDto responseDto = new NewTopicResponseDto(topicUid, postUid);
          return ResponseEntity.ok(responseDto);
        }
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      logger.error("add topic error: ", e);
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * PUT / : edit topic
   *
   * @param categoryUid uid of the parent category
   * @param topicUid uid of the topic
   * @param editTopicRequestDto object with topic data
   * @return void
   */
  @PutMapping("/{topicUid}")
  public ResponseEntity editTopic(
      @PathVariable("categoryUid") String categoryUid,
      @PathVariable("topicUid") String topicUid,
      @Valid @RequestBody EditTopicRequestDto editTopicRequestDto) {
    try {
      Optional<CategoryEntity> category = categoryService.findByUid(categoryUid);
      if (category.isPresent()) {
        TopicEntity topic = topicMapper.dtoToEntity2(editTopicRequestDto);
        topic.setUid(UtilsStringConversions.uidDecode(topicUid));
        if (topicService.edit(topic)) {
          return new ResponseEntity<>(HttpStatus.OK);
        }
      }
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      logger.error("edit topic error: ", e);
      return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
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
