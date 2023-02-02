<template>
  <van-datetime-picker
    v-model="dataModel"
    type="date"
    title="选择年月日"
  />
</template>

<script>
/** vant */
import Vue from 'vue';
import { DatetimePicker } from 'vant';
import moment from 'moment'

Vue.use(DatetimePicker);
import 'vant/lib/index.css'

export default {
  name: 'custom-vant-field',
  props: ['value'],
  data() {
    return {
      dataModel: new Date(this.value)
    }
  },
  watch: {
    value (val) {
      this.dataModel = new Date(val)
    },
    dataModel (val) {
      this.$emit('input', moment(val).format('YYYY-MM-DD'))
    }
  }
}
</script>