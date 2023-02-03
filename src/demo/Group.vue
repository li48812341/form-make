<template>
  <div class="group-component">
    <el-input v-model="name" readonly v-show="showTopInput">
      <i slot="suffix" class="el-input__icon el-icon-more-outline" @click="onClick"></i>
    </el-input>
    <el-input v-model="dataModel" readonly v-show="showInput">
      <i slot="suffix" class="el-input__icon el-icon-more-outline" @click="onClick"></i>
    </el-input>
    <!-- <group :centerDialogVisible="DialogVisible" @multipleSelection="oNmultipleSelection"></group> -->
  </div>
</template>

<script>
// import group from "@/components/Group/group";
export default {
  name: "group-width-height",
  components: {
    // group,
  },
  props: {
    value: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      DialogVisible: { value: false },
      dataModel: "",
      input: "",
      name: "",
      showTopInput: true,
      showInput: false,
    };
  },
  watch: {
    value(val, data) {
      this.dataModel = val.split("-")[0];
      this.name = data.split("-")[1];
    },
    dataModel(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    onClick() {
      this.DialogVisible.value = true;
    },
    oNmultipleSelection(e) {
      this.dataModel = e.id.toString() + "-" + e.groupName;
      this.showInput = false;
      this.showTopInput = true;
    },
  },
};
</script>