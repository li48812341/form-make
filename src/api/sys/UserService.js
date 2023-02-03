
export default class UserService {

  constructor (_vm) {
    this.$http = _vm.$http
  }
  save (inputForm) {
    return this.$http({
      url: `/sys/user/save`,
      method: 'post',
      headers: {arrayFormat: 'repeat'},
      data: inputForm
    })
  }

  saveInfo (inputForm) {
    return this.$http({
      url: `/sys/user/saveInfo`,
      method: 'post',
      headers: {arrayFormat: 'repeat'},
      data: inputForm
    })
  }

  savePwd (inputForm) {
    return this.$http({
      url: `/sys/user/savePwd`,
      method: 'post',
      headers: {arrayFormat: 'repeat'},
      data: inputForm
    })
  }

  delete (ids) {
    return this.$http({
      url: '/sys/user/delete',
      method: 'delete',
      params: {ids: ids}
    })
  }

  queryById (id) {
    return this.$http({
      url: `/sys/user/queryById`,
      method: 'get',
      params: {id: id}
    })
  }

  list (params) {
    return this.$http({
      url: '/sys/user/list',
      method: 'get',
      params: params
    })
  }
}
