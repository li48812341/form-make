import { VueEditor } from "vue2-editor"

VueEditor.install = function (Vue) {
  Vue.component('vue-editor', VueEditor)
}

const install = function (Vue) {
  Vue.component('vue-editor', VueEditor)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  install,
  VueEditor
}

export default {
  install,
  VueEditor
}
