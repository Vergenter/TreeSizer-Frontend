<template>
  <div class="design">
    <h1>This is an design page</h1>
    <div>a{{ $route.params.tree}}a</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
})
export default class Design extends Vue {}
</script>