package base.api.rest.forum.breadcrumbs;

import base.api.domain.forum.breadcrumbs.BreadcrumbsEntity;
import base.api.services.forum.BreadcrumbService;
import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/forum/breadcrumbs")
public class BreadcrumbsController {

  private BreadcrumbsMapper mapper = Mappers.getMapper(BreadcrumbsMapper.class);
  private BreadcrumbService service;

  public BreadcrumbsController(BreadcrumbService service) {
    this.service = service;
  }

  @GetMapping()
  public ResponseEntity<List<BreadcrumbsDataDto>> findAllForumBreadcrumbs() {

    List<BreadcrumbsEntity> breadcrumbsEntityList = service.findAll();
    List<BreadcrumbsDataDto> breadcrumbsDataDtoList =
        breadcrumbsEntityList.stream().map(mapper::entityToRespondDto).collect(Collectors.toList());

    return new ResponseEntity<>(breadcrumbsDataDtoList, HttpStatus.OK);
  }
}
