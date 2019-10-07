package base.api.rest.generic;

import lombok.Data;

import javax.validation.constraints.Min;

@Data
public class GenericPagination {

  private static final Long MAX_PAGE_SIZE = 3000L;
  private static final Long MAX_QUERY_LIMIT = 3000L;

  private static final Long DEFAULT_PAGE_SIZE = 1L;
  private static final Long DEFAULT_QUERY_LIMIT = 10L;

  @Min(1)
  //  @ApiModelProperty(example = "1", position = 2001)
  private Long page = DEFAULT_PAGE_SIZE;

  @Min(0)
  //  @ApiModelProperty(example = "10", position = 2001)
  private Long limit = DEFAULT_QUERY_LIMIT;

  public Long getPage() {
    return getProperValue(page, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);
  }

  public Long getLimit() {
    return getProperValue(limit, DEFAULT_QUERY_LIMIT, MAX_QUERY_LIMIT);
  }

  private Long getProperValue(Long actual, Long defaultValue, Long maxValue) {
    if (actual == null) {
      actual = defaultValue;
      return actual;
    }
    if (actual > maxValue) {
      actual = maxValue;
      return actual;
    }
    return actual;
  }
}
