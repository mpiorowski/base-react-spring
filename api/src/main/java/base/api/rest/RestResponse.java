package base.api.rest;

import lombok.Data;

@Data
public class RestResponse<T> {
  T data;

  public RestResponse(T body) {
    this.data = body;
  }
}
