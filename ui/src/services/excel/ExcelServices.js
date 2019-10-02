import {fileRequest} from "../FileRequest";

export function serviceExcelDownload(data) {
  return fileRequest({
    url: `/api/test/excel/download?startDate=${data[0]}&endDate=${data[1]}`,
    method: 'GET'
  })
}
