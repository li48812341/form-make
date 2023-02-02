<template>
  <div
    :style="{ width: data.config && data.config.width }"
    class="fm-form"
    :class="'fm-' + formStyleKey"
  >
    <el-form
      :ref="formRef"
      :key="formKey"
      v-if="formShow"
      :class="{
        [data.config && data.config.customClass]:
          data.config && data.config.customClass ? true : false,
        'no-label-form': data.config && data.config.labelWidth == 0,
      }"
      :size="data.config && data.config.size"
      :model="models"
      :rules="rules"
      :label-position="data.config && data.config.labelPosition"
      :disabled="!edit"
      :label-width="data.config && data.config.labelWidth + 'px'"
    >
      <template v-for="item in data.list">
        <generate-col-item
          v-if="item.type == 'grid'"
          :key="item.key"
          :model="models"
          :rules="rules"
          :element="item"
          :remote="remote"
          :blanks="blanks"
          :display="displayFields"
          @input-change="onInputChange"
          :edit="edit"
          :remote-option="remoteOption"
          :platform="platform"
          :preview="preview"
          :container-key="containerKey"
        >
          <template v-slot:[blank.name]="scope" v-for="blank in blanks">
            <slot :name="blank.name" :model="scope.model"></slot>
          </template>
        </generate-col-item>

        <generate-tab-item
          v-else-if="item.type == 'tabs'"
          :key="item.key"
          :model="models"
          :rules="rules"
          :element="item"
          :remote="remote"
          :blanks="blanks"
          :display="displayFields"
          @input-change="onInputChange"
          :edit="edit"
          :remote-option="remoteOption"
          :platform="platform"
          :preview="preview"
          :container-key="containerKey"
        >
          <template v-slot:[blank.name]="scope" v-for="blank in blanks">
            <slot :name="blank.name" :model="scope.model"></slot>
          </template>
        </generate-tab-item>

        <generate-report
          v-else-if="item.type == 'report'"
          :key="item.key"
          :model="models"
          :rules="rules"
          :element="item"
          :remote="remote"
          :blanks="blanks"
          :display="displayFields"
          @input-change="onInputChange"
          :edit="edit"
          :remote-option="remoteOption"
          :platform="platform"
          :preview="preview"
          :container-key="containerKey"
        >
          <template v-slot:[blank.name]="scope" v-for="blank in blanks">
            <slot :name="blank.name" :model="scope.model"></slot>
          </template>
        </generate-report>

        <generate-form-item
          v-else
          :key="item.key"
          :models="models"
          :rules="rules"
          :widget="item"
          :remote="remote"
          :blanks="blanks"
          :display="displayFields"
          @input-change="onInputChange"
          :edit="edit"
          :remote-option="remoteOption"
          :platform="platform"
          :preview="preview"
          :container-key="containerKey"
        >
          <template v-slot:[blank.name]="scope" v-for="blank in blanks">
            {{ scope.model }}
            <slot :name="blank.name" :model="scope.model"></slot>
          </template>
        </generate-form-item>
      </template>
    </el-form>
  </div>
</template>

<script>
import GenerateFormItem from "./GenerateFormItem";
import GenerateColItem from "./GenerateColItem";
import GenerateTabItem from "./GenerateTabItem";
import GenerateReport from "./GenerateReport";
import {
  loadJs,
  updateStyleSheets,
  splitStyleSheets,
  clearStyleSheets,
} from "../util/index.js";
import { EventBus } from "../util/event-bus.js";
import moment from "moment";
import _ from "lodash";

export default {
  name: "fm-generate-form",
  components: {
    GenerateFormItem,
    GenerateColItem,
    GenerateTabItem,
    GenerateReport,
    moment,
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        list: [],
        config: {
          labelWidth: 100,
          labelPosition: "right",
          size: "small",
          customClass: "",
          ui: "element",
          layout: "horizontal",
          labelCol: 3,
        },
      }),
    },
    remote: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Object,
      default: () => ({}),
    },
    edit: {
      type: Boolean,
      default: true,
    },
    remoteOption: {
      type: Object,
      default: () => ({}),
    },
    preview: {
      type: Boolean,
      default: false,
    },
    platform: {
      type: String,
      default: "pc",
    },
  },
  data() {
    return {
      models: {},
      rules: {},
      blanks: [],
      displayFields: {},
      dataBindFields: [],
      generateShow: false,
      resetModels: {},
      formKey: Math.random().toString(36).slice(-8),
      formStyleKey: Math.random().toString(36).slice(-8),
      formValue: this.value,
      formShow: false,
      formRef: Math.random().toString(36).slice(-8) + "Form",
      containerKey: Math.random().toString(36).slice(-8),
    };
  },
  created() {
    this._initForm();
  },
  mounted() {
    const _this = this;
    EventBus.$on("on-change", (value, field, containerKey) => {
      _this.$emit("on-change", field, value, _this.models);
      _this.$emit(`on-${field}-change`, value);

      if (this.containerKey == containerKey) {
        _this.setData({
          [field]: value,
        });
      }
    });
  },
  beforeDestroy() {
    let head = ".fm-" + this.formStyleKey + " ";
    clearStyleSheets(head);
    EventBus.$off("on-change");
  },
  methods: {
    _initForm() {
      this.formShow = false;
      if (Object.keys(this.data).length) {
        this.generateModel(this.data.list);
      } else {
        this.generateModel([]);
      }

      this.resetModels = _.cloneDeep(this.models);

      this.models = { ...this.models };

      this.formShow = true;

      if (this.data.config && this.data.config.styleSheets) {
        let head = ".fm-" + this.formStyleKey + " ";

        updateStyleSheets(splitStyleSheets(this.data.config.styleSheets), head);
      }
      const Fn = new Function("_this", this.data.config.init);
      Fn(this);
    },
    generateModel(genList) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === "grid") {
          this.displayFields[genList[i].model] = !genList[i].options.hidden;

          genList[i].columns.forEach((item) => {
            this.generateModel(item.list);
          });
        } else if (genList[i].type === "tabs") {
          genList[i].tabs.forEach((item) => {
            this.generateModel(item.list);
          });

          this.displayFields[genList[i].model] = !genList[i].options.hidden;
        } else if (genList[i].type === "report") {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this.generateModel(column.list);
            });
          });

          this.displayFields[genList[i].model] = !genList[i].options.hidden;
        } else {
          if (Object.keys(this.formValue).indexOf(genList[i].model) >= 0) {
            // 处理老版本没有dataBind值的情况，默认绑定数据
            if (
              Object.keys(genList[i].options).indexOf("dataBind") < 0 ||
              genList[i].options.dataBind
            ) {
              this.models[genList[i].model] = this.formValue[genList[i].model];
              this.dataBindFields.push(genList[i].model);
            }

            this.displayFields[genList[i].model] = !genList[i].options.hidden;

            if (genList[i].type === "blank") {
              this.blanks.push({
                name: genList[i].model,
              });
            }
          } else {
            if (genList[i].type === "blank") {
              // bound the default value
              if (
                Object.keys(genList[i].options).indexOf("dataBind") < 0 ||
                genList[i].options.dataBind
              ) {
                this.models[genList[i].model] =
                  genList[i].options.defaultType === "String"
                    ? ""
                    : genList[i].options.defaultType === "Object"
                    ? {}
                    : [];
                this.dataBindFields.push(genList[i].model);
              }
              this.displayFields[genList[i].model] = !genList[i].options.hidden;

              this.blanks.push({
                name: genList[i].model,
              });
            } else {
              if (
                Object.keys(genList[i].options).indexOf("dataBind") < 0 ||
                genList[i].options.dataBind
              ) {
                if (/^[$][{].*[}]$/.test(genList[i].options.defaultValue)) {
                  let params = genList[i].options.defaultValue.substring(
                    2,
                    genList[i].options.defaultValue.length - 1
                  );
                  if (params === "new Date()") {
                    genList[i].options.defaultValue = moment(new Date()).format(
                      "YYYY-MM-DD HH:mm:ss"
                    );
                  } else {
                    let value = this.$store.state;
                    params.split(".").forEach((param) => {
                      value = value?.[param];
                    });
                    genList[i].options.defaultValue = value;
                  }
                }
                this.models[genList[i].model] = genList[i].options.defaultValue;
                this.dataBindFields.push(genList[i].model);
              }
              this.displayFields[genList[i].model] = !genList[i].options.hidden;
            }
          }

          genList[i].tableColumns &&
            genList[i].tableColumns.length &&
            genList[i].tableColumns.forEach((item) => {
              if (item.type === "blank") {
                this.blanks.push({
                  name: item.model,
                });
              }

              // 处理 rules
              if (this.rules[`${genList[i].model}.${item.model}`]) {
                this.rules[`${genList[i].model}.${item.model}`] = [
                  ...this.rules[`${genList[i].model}.${item.model}`],
                  ...(item.rules
                    ? item.rules.map((im) => {
                        if (im.pattern) {
                          return { ...im, pattern: eval(im.pattern) };
                        } else {
                          return { ...im };
                        }
                      })
                    : []),
                ];
              } else {
                this.rules[`${genList[i].model}.${item.model}`] = [
                  ...(item.rules
                    ? item.rules.map((im) => {
                        if (im.pattern) {
                          return { ...im, pattern: eval(im.pattern) };
                        } else {
                          return { ...im };
                        }
                      })
                    : []),
                ];
              }
            });

          if (this.rules[genList[i].model]) {
            this.rules[genList[i].model] = [
              ...this.rules[genList[i].model],
              ...(genList[i].rules
                ? genList[i].rules.map((item) => {
                    if (item.pattern) {
                      return { ...item, pattern: eval(item.pattern) };
                    } else {
                      return { ...item };
                    }
                  })
                : []),
            ];
          } else {
            this.rules[genList[i].model] = [
              ...(genList[i].rules
                ? genList[i].rules.map((item) => {
                    if (item.pattern) {
                      return { ...item, pattern: eval(item.pattern) };
                    } else {
                      return { ...item };
                    }
                  })
                : []),
            ];
          }
        }
      }

      console.log("this--------------------------");
      console.log(this);
    },
    _setDisabled(genList, fields, disabled) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === "grid") {
          genList[i].columns.forEach((item) => {
            this._setDisabled(item.list, fields, disabled);
          });
        } else if (genList[i].type === "tabs") {
          genList[i].tabs.forEach((item) => {
            this._setDisabled(item.list, fields, disabled);
          });
        } else if (genList[i].type == "report") {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this._setDisabled(column.list, fields, disabled);
            });
          });
        } else {
          if (fields.indexOf(genList[i].model) >= 0) {
            this.$set(genList[i].options, "disabled", disabled);
          }
        }
      }
    },
    _updateClassName(genList, fields, className, updateType) {
      for (let i = 0; i < genList.length; i++) {
        if (genList[i].type === "grid") {
          genList[i].columns.forEach((item) => {
            this._updateClassName(item.list, fields, className, updateType);
          });
        } else if (genList[i].type === "tabs") {
          genList[i].tabs.forEach((item) => {
            this._updateClassName(item.list, fields, className, updateType);
          });
        } else if (genList[i].type == "report") {
          genList[i].rows.forEach((row) => {
            row.columns.forEach((column) => {
              this._updateClassName(column.list, fields, className, updateType);
            });
          });
        } else {
          if (fields.indexOf(genList[i].model) >= 0) {
            if (
              updateType == "add" &&
              !genList[i].options.customClass.split(" ").includes(className)
            ) {
              this.$set(
                genList[i].options,
                "customClass",
                [...genList[i].options.customClass.split(" "), className].join(
                  " "
                )
              );
            }

            if (
              updateType == "remove" &&
              genList[i].options.customClass.split(" ").includes(className)
            ) {
              let originArray = genList[i].options.customClass.split(" ");
              originArray.splice(
                originArray.findIndex((item) => item == className),
                1
              );
              this.$set(
                genList[i].options,
                "customClass",
                originArray.join(" ")
              );
            }
          }
        }
      }
    },
    getData(isValidate = true) {
      return new Promise((resolve, reject) => {
        if (isValidate) {
          this.$refs[this.formRef].validate((valid) => {
            if (valid) {
              const resData = {};
              Object.keys(this.models).forEach((key) => {
                if (
                  this.displayFields[key] &&
                  this.dataBindFields.indexOf(key) >= 0
                ) {
                  resData[key] = this.models[key];
                }
              });
              resolve(JSON.parse(JSON.stringify(resData)));
            } else {
              reject(new Error(this.$t("fm.message.validError")).message);
            }
          });
        } else {
          Object.keys(this.models).forEach((key) => {
            if (
              this.displayFields[key] &&
              this.dataBindFields.indexOf(key) >= 0
            ) {
              resData[key] = this.models[key];
            }
          });
          resolve(JSON.parse(JSON.stringify(resData)));
        }
      });
    },
    // jeeplus定制修改
    getDataBindFields() {
      return this.dataBindFields;
    },
    reset() {
      this.setData(_.cloneDeep(this.resetModels));
      this.formKey = Math.random().toString(36).slice(-8);
    },
    onInputChange(value, field) {
      this.$emit("on-change", field, value, this.models);
      this.$emit(`on-${field}-change`, value);
    },
    display(fields) {
      Object.keys(this.displayFields).forEach((key) => {
        if (fields.indexOf(key) >= 0) {
          this.$set(this.displayFields, key, true);
        }
      });
      this.displayFields = { ...this.displayFields };
    },
    hide(fields) {
      Object.keys(this.displayFields).forEach((key) => {
        if (fields.indexOf(key) >= 0) {
          this.$set(this.displayFields, key, false);
        }
      });
      this.displayFields = { ...this.displayFields };
    },
    disabled(fields, disabled) {
      this._setDisabled(this.data.list, fields, disabled);
    },
    addClassName(fields, className) {
      this._updateClassName(this.data.list, fields, className, "add");
    },
    removeClassName(fields, className) {
      this._updateClassName(this.data.list, fields, className, "remove");
    },
    refresh() {
      this._initForm();
    },
    setData(value) {
      Object.keys(value).forEach((item) => {
        this.$set(this.models, item, value[item]);
      });
      if (this.data.config.formulaJs) {
        const Fn = new Function("_this", this.data.config.formulaJs);
        Fn(this);
      }
    },
    _findComponentDownward(context, name, result) {
      let children = context.$children;

      if (result) {
        return result;
      }

      if (children.length == 0) {
        result = null;
      } else {
        for (let i = 0; i < children.length; i++) {
          let currentComponent = children[i];

          let currentRefArray = Object.keys(currentComponent.$refs);

          if (currentRefArray.indexOf(name) >= 0) {
            result = currentComponent.$refs[name];
            break;
          } else {
            result = this._findComponentDownward(
              currentComponent,
              name,
              result
            );
          }
        }
      }
      return result;
    },
    getComponent(refName) {
      return this._findComponentDownward(this, refName, null);
    },
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.models = { ...this.models, ...val };
      },
    },
    data: {
      deep: true,
      handler(val) {
        // this._initForm()
      },
    },
  },
};
</script>

<style lang="scss"></style>
