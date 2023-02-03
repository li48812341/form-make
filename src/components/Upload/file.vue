<template>
  <div class="fm-upload-file"
    :id="uploadId"
  >
    <div class="file-button"
      v-show="(!isQiniu || (isQiniu && token))"
    >
      <el-button v-if="ui == 'element'" type="primary" :disabled="disabled || fileList.length == limit" @click="handleAdd">{{$t('fm.actions.upload')}}</el-button>
      <a-button v-if="ui == 'antd'" icon="upload" :disabled="disabled || fileList.length == limit" @click="handleAdd">{{$t('fm.actions.upload')}}</a-button>
      <input v-if="multiple"  multiple ref="uploadInput" @change="handleChange" type="file"  name="file" class=" upload_input">
      <input v-else ref="uploadInput" @change="handleChange" type="file"  name="file" class=" upload_input">
    </div>

    <div class="upload_tip">
      {{tip}}
    </div>

    <ul class="upload-list">
      <li class="list_item" 
        :class="{uploading: item.status=='uploading', 'is-success': item.status=='success', 'is-disabled': disabled}"
        v-for="(item) in fileList" :key="item.key"
      >
        <a class="list_item-name" :href="item.url" target="_blank">
          <i v-if="ui == 'element'" class="el-icon-document"></i>  
          <a-icon v-if="ui == 'antd'" type="paper-clip" />
          {{item.name}}
        </a>
        <label class="list_item-status-label">
          <i v-if="ui == 'element'" class="icon-upload-success el-icon-circle-check"></i>
          <a-icon v-if="ui == 'antd'" type="check-circle" class="icon-upload-success"></a-icon>
        </label>
        <i v-if="ui == 'element'" class="el-icon-close icon-close" @click="handleRemove(item.key)"></i>
        <a-icon type="delete" v-if="ui == 'antd'" class="icon-close" @click="handleRemove(item.key)"></a-icon>

        <el-progress v-if="item.status == 'uploading' && ui == 'element'" :stroke-width="2" :percentage="item.percent"></el-progress>
        <a-progress v-if="item.status == 'uploading' && ui == 'antd'" :stroke-width="2" :percent="item.percent" />
      </li>
    </ul>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import { EventBus } from '../../util/event-bus.js'
import * as qiniu from 'qiniu-js'
require('viewerjs/dist/viewer.css')
export default {
  components: {
    Draggable
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    token: {
      type: String,
      default: ''
    },
    domain: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 9
    },
    isQiniu: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    action: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String,
      default: ''
    },
    headers: {
      type: Array,
      default: () => []
    },
    ui: {
      type: String,
      default: 'element'
    }
  },
  data () {
    return {
      fileList: this.value.map(item => {
        return {
          ...item,
          key: item.key ? item.key : (new Date().getTime()) + '_' + Math.ceil(Math.random() * 99999),
        }
      }),
      viewer: null,
      uploadId: 'upload_' + new Date().getTime(),
      editIndex: -1,
      meituIndex: -1,
    }
  },
  computed: {
    miniWidth () {
      if (this.width > this.height) {
        return this.height
      } else {
        return this.width
      }
    }
  },
  methods: {
    handleChange () {
      console.log(this.$refs.uploadInput.files)
      const files = this.$refs.uploadInput.files
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        const key = (new Date().getTime()) + '_' + Math.ceil(Math.random() * 99999)
        reader.readAsDataURL(file)
        reader.onload = () => {
          
          if (this.editIndex >= 0) {

            this.$set(this.fileList, this.editIndex, {
              key,
              url: reader.result,
              percent: 0,
              status: 'uploading',
              name: file.name
            })

            this.editIndex = -1
          } else {
            this.fileList.push({
              key,
              url: reader.result,
              percent: 0,
              status: 'uploading',
              name: file.name
            })
          }

          this.$nextTick(() => {
            if (this.isQiniu) {
              this.uplaodAction2(reader.result, file, key)
            } else {
              this.uplaodAction(reader.result, file, key)
            }
          })
        }
      }
      this.$refs.uploadInput.value = []
    }, 
    uplaodAction (res, file, key) {
      let changeIndex = this.fileList.findIndex(item => item.key === key)
      console.log(this.fileList.findIndex(item => item.key === key))
      const xhr = new XMLHttpRequest()
      
      const url = this.action
      xhr.open('POST', url, true)
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data')
      this.headers.map(item => {
        xhr.setRequestHeader(item.key, item.value)
      })

      let formData = new FormData()
      formData.append('file', file)
      formData.append('fname', file.name)
      formData.append('key', key)

      xhr.send(formData)
      xhr.onreadystatechange = () => {
        console.log(xhr)
        if (xhr.readyState === 4) {
          
          let resData = JSON.parse(xhr.response)
          if (resData && resData.url) {
            this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
              ...this.fileList[this.fileList.findIndex(item => item.key === key)],
              url: resData.url,
              percent: 100,
              ...resData
            })
            setTimeout(() => {
              this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
                ...this.fileList[this.fileList.findIndex(item => item.key === key)],
                status: 'success'
              })
              if (this.ui == 'element') {
                this.$emit('input', this.fileList)
              } else {
                EventBus.$emit('on-field-change', this.$attrs.id, this.fileList)
              }
            }, 200)
          } else {
            this.$set(this.fileList, this.fileList.findIndex(item => item.key === key), {
              ...this.fileList[this.fileList.findIndex(item => item.key === key)],
              status: 'error'
            })
            this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
          }
        }
      }
      xhr.onprogress = (res) => {
        console.log('progress', res)
        if (res.total && res.loaded) {
          this.$set(this.fileList[this.fileList.findIndex(item => item.key === key)], 'percent', res.loaded/res.total*100)
        }
      }
    },
    uplaodAction2 (res, file, key) {
      const _this = this
      const observable = qiniu.upload(file, key, this.token, {
        fname: file.name,
        mimeType: []
      }, {
        useCdnDomain: true,
        // region: qiniu.region.z2
      })
      observable.subscribe({
        next (res) {
          _this.$set(_this.fileList[_this.fileList.findIndex(item => item.key === key)], 'percent', parseInt(res.total.percent))
          
        },
        error (err) {
          _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
            ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
            status: 'error'
          })
          _this.fileList.splice(_this.fileList.findIndex(item => item.key === key), 1)
        },
        complete (res) {
          _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
            ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
            url: _this.domain + res.key,
            percent: 100,
            ...res,
          })
          setTimeout(() => {
            _this.$set(_this.fileList, _this.fileList.findIndex(item => item.key === key), {
              ..._this.fileList[_this.fileList.findIndex(item => item.key === key)],
              status: 'success'
            })
            
            if (_this.ui == 'element') {
              _this.$emit('input', _this.fileList)
            } else {
              EventBus.$emit('on-field-change', _this.$attrs.id, _this.fileList)
            }
          }, 200)
        }
      })
    },
    handleRemove (key) {
      if (!this.disabled) {
        this.fileList.splice(this.fileList.findIndex(item => item.key === key), 1)
        this.$nextTick(() => {
          if (this.ui == 'element') {
            this.$emit('input', this.fileList)
          } else {
            EventBus.$emit('on-field-change', this.$attrs.id, this.fileList)
          }
        })
      }
    },
    handleAdd () {
      if (!this.disabled) {
        this.editIndex = -1
        this.$refs.uploadInput.click()
      }
    },
    handlePreviewFile (key) {
      this.viewer && this.viewer.destroy()
      this.uploadId = 'upload_' + new Date().getTime()
      
      console.log(this.viewer)
      this.$nextTick(() => {
        this.viewer = new Viewer(document.getElementById(this.uploadId))
        this.viewer.view(this.fileList.findIndex(item => item.key === key))
      })
    }
  },
  watch: {
    value (val) {
      this.fileList = this.value.map(item => {
        return {
          ...item,
          key: item.key ? item.key : (new Date().getTime()) + '_' + Math.ceil(Math.random() * 99999),
        }
      })
    }
  }
}
</script>

<style lang="scss">
.fm-upload-file{
  .upload_input{
    display: none !important;
  }

  .upload_tip{
    font-size: 12px;
    color: #606266;
    margin-top: 7px;
  }

  .upload-list{
    margin: 0;
    padding: 0;
    list-style: none;

    .list_item{
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      margin-top: 5px;
      position: relative;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;

      &.is-disabled{
        // &::before{
        //   position: absolute;
        //   top:0;
        //   left: 0;
        //   bottom: 0;
        //   right: 0;
        //   z-index: 99;
        //   display: block;
        //   content: '';
        //   cursor: not-allowed;
        // }
        .icon-close{
          cursor: not-allowed;
        }
      }



      .el-progress,.ant-progress{
        position: absolute;
        top: 20px;
        width: 100%;
      }

      .el-progress__text,.ant-progress-text{
        position: absolute;
        right: 0;
        top: -13px;
      }

      .el-progress-bar,.ant-progress-outer{
        margin-right: 0;
        padding-right: 0;
      }

      &.is-success{
        .list_item-status-label{
          .icon-upload-success{
            display: inline-block;
            line-height: inherit;
          }
        }
      }

      .icon-close{
        display: none;
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        color: #606266;
        font-weight: 400;
      }

      &:hover{
        background-color: #f5f7fa;

        .icon-close{
          display: inline-block;
        }

        .list_item-status-label{
          display: none;
        }

        .el-progress__text{
          display: none;
        }
      }

      .list_item-name{
        text-decoration: none;
        color: #606266;
        display: block;
        margin-right: 40px;
        overflow: hidden;
        padding-left: 4px;
        text-overflow: ellipsis;
        transition: color .3s;
        white-space: nowrap;

        &:hover{
          color: #409eff;
          cursor: pointer;
        }

        i{
          margin-right: 7px;
          color: #909399;
          height: 100%;
          line-height: inherit;
        }
      }

      .list_item-status-label{
        display: block;
        position: absolute;
        right: 5px;
        top: 0;
        line-height: inherit;

        .icon-upload-success{
          color: #67c23a;
          display: none;
        }
      }
    }
  }
}
</style>
