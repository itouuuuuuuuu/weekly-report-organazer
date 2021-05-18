<template lang="pug">
.main-header
  h1 Weekly Report Organazer
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class MainHeader extends Vue {
}
</script>

<style lang="scss" scoped>
.main-header {
  h1 {
    color: #555;
    font-size: 20px;
    text-align: left;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
    margin-bottom: 20px;
  }
}
</style>
