
export default class DictService {
  constructor (_vm) {
    this.$http = _vm.$http
  }

  queryById (id) {
    return this.$http({
      url: `/sys/dict/queryById`,
      method: 'get',
      params: {id: id}
    })
  }

  save (inputForm) {
    return this.$http({
      url: `/sys/dict/save`,
      method: 'post',
      data: inputForm
    })
  }

  list (params) {
    return this.$http({
      url: '/sys/dict/type/list',
      method: 'get',
      params: params
    })
  }

  delete (ids) {
    return this.$http({
      url: '/sys/dict/delete',
      method: 'delete',
      params: {'ids': ids}
    })
  }

  queryDictValue (id) {
    return this.$http({
      url: `/sys/dict/queryDictValue`,
      method: 'get',
      params: {dictValueId: id},
      loading: false
    })
  }

  saveDictValue (inputForm) {
    return this.$http({
      url: `/sys/dict/saveDictValue`,
      method: 'post',
      data: inputForm
    })
  }

  getDictValue (dictTypeId) {
    return this.$http({
      url: '/sys/dict/getDictValue',
      method: 'get',
      params: {
        'dictTypeId': dictTypeId
      }
    })
  }

  getDictMap (dictTypeId) {
    return this.$http({
      url: '/sys/dict/getDictMap',
      method: 'get',
      params: {
        'dictTypeId': dictTypeId
      }
    })
  }

  deleteDictValue (ids) {
    return this.$http({
      url: '/sys/dict/deleteDictValue',
      method: 'delete',
      params: {ids: ids}
    })
  }
}
