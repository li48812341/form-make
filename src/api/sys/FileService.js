
export default class FileService {
  constructor (_vm) {
    this.$http = _vm.$http
  }

  uploadFile (formData, uploadPath) {
    return this.$http({
      url: `/sys/file/webupload/upload?uploadPath=${uploadPath}`,
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  }

  getUrl (params) {
    return this.$http({
      url: `/sys/file/getUrl`,
      method: 'get',
      params: params
    })
  }
}
