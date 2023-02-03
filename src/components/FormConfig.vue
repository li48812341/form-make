<template>
  <div class="form-config-container">
    <el-form size="small" label-position="top">
      <el-form-item :label="$t('fm.config.form.width')">
        <el-input v-model="data.width" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.form.labelPosition.title')">
        <el-radio-group v-model="data.labelPosition" :key="data.labelPosition">
          <el-radio-button label="left">{{
            $t("fm.config.form.labelPosition.left")
          }}</el-radio-button>
          <el-radio-button label="right">{{
            $t("fm.config.form.labelPosition.right")
          }}</el-radio-button>
          <el-radio-button label="top">{{
            $t("fm.config.form.labelPosition.top")
          }}</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('fm.config.form.labelWidth')">
        <el-input-number
          v-model="data.labelWidth"
          :min="0"
          :max="200"
          :step="10"
        ></el-input-number>
      </el-form-item>

      <el-form-item :label="$t('fm.config.form.size')">
        <el-radio-group v-model="data.size">
          <el-radio-button label="medium">medium</el-radio-button>
          <el-radio-button label="small">small</el-radio-button>
          <el-radio-button label="mini">mini</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item :label="$t('fm.config.form.styleSheets')">
        <el-button style="width: 100%" @click="handleSetStyleSheets">{{
          $t("fm.config.widget.setting")
        }}</el-button>
      </el-form-item>

      <el-form-item :label="$t('fm.config.form.customClass')">
        <el-select
          style="width: 100%"
          v-model="customClassArray"
          multiple
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="item in sheets"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('fm.config.form.initJs')">
        <el-input type="textarea" v-model="data.init" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.form.formulaJs')">
        <el-input type="textarea" v-model="data.formulaJs" clearable></el-input>
      </el-form-item>
      <el-form-item :label="$t('fm.config.form.customJs')">
        <el-input type="textarea" v-model="data.customJs" clearable></el-input>
        <el-radio v-model="data.eventType" label="1">保存前执行</el-radio>
        <el-radio v-model="data.eventType" label="2">保存后执行</el-radio>
      </el-form-item>
    </el-form>
    <code-dialog
      ref="styleDialog"
      mode="css"
      :title="$t('fm.config.form.styleSheets')"
      help="https://www.yuque.com/ln7ccx/ntgo8q/bau8eo"
      @on-confirm="handlestyleSheetsConfirm"
    ></code-dialog>
  </div>
</template>

<script>
import CodeEditor from "../components/CodeEditor";
import CodeDialog from "./CodeDialog";
import { splitStyleSheets } from "../util";
import { EventBus } from "../util/event-bus.js";
export default {
  components: {
    CodeEditor,
    CodeDialog,
  },
  props: ["data", "sheets"],
  data() {
    return {
      customClassArray: this.data.customClass.split(" ").filter((item) => item),
    };
  },
  methods: {
    handleSetStyleSheets() {
      let sheets = document.styleSheets[0];

      if (sheets.insertRule) {
        this.$refs.styleDialog.open(this.data.styleSheets || "");
      } else {
        this.$message.warning(this.$t("fm.message.notSupport"));
      }
    },

    handlestyleSheetsConfirm(value) {
      this.data.styleSheets = value;

      this.$refs.styleDialog.close();

      var arr = splitStyleSheets(value);

      this.$emit("on-style-update", arr);
    },
  },
  watch: {
    "data.layout": function (val) {
      if (this.data.ui == "antd") {
        if (val == "horizontal" || !val) {
          this.data.labelPosition = "right";
        } else {
          this.data.labelPosition = "top";
        }
      }
    },
    "data.labelPosition": function (val) {
      if (val == "top") {
        this.data.layout = "vertical";
        this.data.labelCol = 0;
      } else {
        this.data.layout = "horizontal";
        this.data.labelCol = 3;
      }
    },
    "data.customClass": function (val) {
      this.customClassArray = this.data.customClass
        .split(" ")
        .filter((item) => item);
    },
    customClassArray(val) {
      this.data.customClass = val.join(" ");
    },
  },
};
</script>
