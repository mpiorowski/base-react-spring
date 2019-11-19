package base.api.rest.forum.posts;

import base.api.domain.forum.posts.PostEntity;
import base.api.domain.forum.topics.TopicEntity;
import base.api.logging.LogExecutionTime;
import base.api.rest.RestResponse;
import base.api.rest.forum.posts.dto.PostDataDto;
import base.api.rest.forum.posts.dto.PostReplyDto;
import base.api.rest.forum.posts.dto.PostRequestDto;
import base.api.rest.forum.posts.dto.PostsResponseDto;
import base.api.rest.forum.topics.TopicMapper;
import base.api.rest.forum.topics.dto.TopicDataDto;
import base.api.services.forum.PostService;
import base.api.services.forum.TopicService;
import base.api.utils.Utils;
import base.api.utils.UtilsUid;
import org.mapstruct.factory.Mappers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/forum/topics/{topicUid}/posts")
public class PostsController {

  private static final Logger logger = LoggerFactory.getLogger(PostsController.class);
  private final PostService postService;
  private final TopicService topicService;
  private PostMapper postMapper = Mappers.getMapper(PostMapper.class);
  private TopicMapper topicMapper = Mappers.getMapper(TopicMapper.class);

  public PostsController(PostService postService, TopicService topicService) {
    this.postService = postService;
    this.topicService = topicService;
  }

  /**
   * GET / : find all posts by parent topic uid
   *
   * @param topicUid uid of the parent topic
   * @return PostsResponseDto object
   */
  @GetMapping()
  public ResponseEntity<PostsResponseDto> findPostsByTopicUid(
      @PathVariable("topicUid") String topicUid) {

    Optional<TopicEntity> topic = topicService.findByUid(topicUid);

    if (topic.isPresent()) {
      logger.info(topic.toString());
      TopicDataDto topicDataDto = topicMapper.entityToDataDto(topic.get());

      logger.info(topicDataDto.toString());

      List<PostEntity> postsEntity = postService.findPostsByTopicId(topic.get().getId());

      List<PostDataDto> postDataDtoList = new ArrayList<>();

      postsEntity.forEach(
          postEntity -> {
            logger.info(postEntity.toString());
            if (postEntity.getReplyId() == null || postEntity.getReplyId() == 0) {
              PostDataDto postDataDto = postMapper.entityToDataDto(postEntity);
              List<PostReplyDto> replies =
                  postsEntity.stream()
                      .filter(reply -> postEntity.getId().equals(reply.getReplyId()))
                      //                      .filter(reply -> Objects.nonNull(reply))
                      .map(reply -> postMapper.entityToReplyDto(reply))
                      .collect(Collectors.toList());

              postDataDto.setPostReplies(replies);
              postDataDtoList.add(postDataDto);
            }
          });

      //      List<PostDataDto> postDataDtoList =
      //          posts.stream().map(postMapper::entityToDto).collect(Collectors.toList());

      PostsResponseDto response = new PostsResponseDto();
      response.setTopic(topicDataDto);
      response.setPosts(postDataDtoList);

      return ResponseEntity.ok(response);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  /**
   * GET / : find post by uid
   *
   * @param topicUid uid of the parent topic
   * @param postUid uid of the post
   * @return PostDataDto object
   */
  @GetMapping("/{postUid}")
  public ResponseEntity<PostDataDto> findPostByUid(
      @PathVariable("topicUid") String topicUid, @PathVariable("postUid") String postUid) {

    Optional<TopicEntity> topic = topicService.findByUid(topicUid);

    if (topic.isPresent()) {
      Optional<PostEntity> post = postService.findByUid(postUid);
      if (post.isPresent()) {
        PostDataDto postDataDto = postMapper.entityToDataDto(post.get());
        return ResponseEntity.ok(postDataDto);
      }
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  /**
   * POST / : add post
   *
   * @param topicUid uid of the parent topic
   * @param postRequestDto object with post data
   * @param user current logged user
   * @return postUid
   */
  @PostMapping()
  public ResponseEntity<PostEntity> addPost(
      @Valid @PathVariable("topicUid") String topicUid,
      @Valid @RequestBody PostRequestDto postRequestDto) {

    // TODO - return postEntity

    Optional<TopicEntity> topic = topicService.findByUid(topicUid);
    if (topic.isPresent()) {

      PostEntity postEntity = postMapper.requestDtoToEntity(postRequestDto);

      if (postRequestDto.getReplyUid() != null) {
        Optional<PostEntity> replyEntity = postService.findByUid(postRequestDto.getReplyUid());
        replyEntity.ifPresent(entity -> postEntity.setReplyId(entity.getId()));
      }
      postEntity.setTopicId(topic.get().getId());
      Optional<PostEntity> post = postService.add(postEntity);

      return post.map(val -> new ResponseEntity<>(val, HttpStatus.CREATED))
          .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  /**
   * PUT / : edit post
   *
   * @param topicUid uid of the parent topic
   * @param postUid uid of the post
   * @param postRequestDto object with post data
   * @param user current logged user
   * @return void
   */
  @PutMapping("/{postUid}")
  public ResponseEntity<PostEntity> editPost(
      @Valid @PathVariable("postUid") String postUid,
      @Valid @PathVariable("topicUid") String topicUid,
      @Valid @RequestBody PostRequestDto postRequestDto) {

    Optional<TopicEntity> topic = topicService.findByUid(topicUid);
    if (topic.isPresent()) {
      PostEntity postEntity = postMapper.requestDtoToEntity(postRequestDto);
      postEntity.setUid(UtilsUid.uidDecode(postUid));
      postEntity.setTopicId(topic.get().getId());
      Optional<PostEntity> post = postService.edit(postEntity);
      return post.map(val -> new ResponseEntity<>(val, HttpStatus.CREATED))
        .orElseGet(() -> new ResponseEntity<>(HttpStatus.BAD_REQUEST));
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  /**
   * DELETE / : delete post
   *
   * @param postUid uid of the post
   * @return void
   */
  @LogExecutionTime
  @DeleteMapping("/{postUid}")
  public ResponseEntity deletePost(@PathVariable("postUid") String postUid) {
    postService.delete(postUid);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  /**
   * PATCH / : activate/deactivate post
   *
   * @param postUid uid of the post
   * @return void
   */
  @LogExecutionTime
  @PatchMapping("/{postUid}")
  public ResponseEntity changeStatusPost(@PathVariable("postUid") String postUid) {
    postService.changeStatus(postUid);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
