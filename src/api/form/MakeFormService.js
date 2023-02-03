
export default class MakeFormService {
  constructor (_vm) {
    this.$http = _vm.$http
  }

  save (inputForm) {
    return this.$http({
      url: `/form/make/save`,
      method: 'post',
      data: inputForm
    })
  }

  saveFormSource (inputForm) {
    return this.$http({
      url: `/form/make/saveFormSource`,
      method: 'post',
      data: inputForm
    })
  }

  saveBasicInfo (inputForm) {
    return this.$http({
      url: `/form/make/saveBasicInfo`,
      method: 'post',
      data: inputForm
    })
  }

  delete (ids) {
    return this.$http({
      url: '/form/make/delete',
      method: 'delete',
      params: {ids: ids}
    })
  }

  queryById (id) {
    return this.$http({
      url: `/form/make/queryById`,
      method: 'get',
      params: {id: id}
    })
  }

  getTableColumnList (params) {
    return this.$http({
      url: `/form/make/getTableColumnList`,
      method: 'get',
      params: params
    })
  }

  getTableList (params) {
    return this.$http({
      url: `/form/make/getTableList`,
      method: 'get',
      params: params
    })
  }

  list (params) {
    return this.$http({
      url: '/form/make/list',
      method: 'get',
      params: params
    })
  }

  validateTableNoExist (params) {
    return this.$http({
      url: `/form/make/validateTableNoExist`,
      method: 'get',
      params: params
    })
  }

  validateKeyNoExist (params) {
    return this.$http({
      url: `/form/make/validateKeyNoExist`,
      method: 'get',
      params: params
    })
  }

  createMenu (inputForm) {
    return this.$http({
      url: `/form/make/createMenu`,
      method: 'post',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
      data: inputForm
    })
  }
}
