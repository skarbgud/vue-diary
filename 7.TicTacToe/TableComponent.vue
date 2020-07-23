<template>
  <table>
    zzzz
    <tr-component
      v-for="(rowData, index) in tableData"
      :row-data="rowData"
      :row-index="index"
    ></tr-component>
  </table>
</template>

<script>
import TrComponents from "./TrComponents.vue";
export default {
  props: {
    tableData: Array,
  },
  components: {
    TrComponents,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
