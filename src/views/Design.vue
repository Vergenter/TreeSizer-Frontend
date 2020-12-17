<template>
  <!-- <div class="black"></div> -->
  <panZoom
    :options="{ minZoom: 0.5, maxZoom: 5, initialZoom: 1 }"
    class="panzoom"
  >
    <div class="black"></div>
  </panZoom>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class Design extends Vue {}
</script>

<style scoped>
.panzoom {
  height: 100%;
  width: 100%;
}
.panzoom >>> .vue-pan-zoom-scene {
  height: 100%;
  width: 100%;
}
.black {
  height: 100px;
  width: 100px;
  background-color: black;
}
</style>
