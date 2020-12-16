<template>
  <div class="creator">
    <h1>This is an creator page</h1>
    <div>a{{ $route.params.tree}}a</div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
})
export default class Creator extends Vue {}
</script>