<template>
  <div :id="id"></div>
</template>

<script>
import { Chart } from '@antv/g2';

export default {
  name: 'custom-chart',
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    height: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      dataModel: this.value,
      id: 'chart-' + Math.random().toString(36).slice(-8)
    }
  },
  mounted () {
    const chart = new Chart({
      container: this.id,
      autoFit: true,
      height: this.height,
    });

    chart.data(this.dataModel);
    chart.scale('sales', {
      nice: true,
    });

    chart.tooltip({
      showMarkers: false
    });
    chart.interaction('active-region');

    chart.interval().position('year*sales');

    chart.render();
  },
  watch: {
    value (val) {
      this.dataModel = val
    },
    dataModel (val) {
      this.$emit('input', val)
    }
  }
}
</script>