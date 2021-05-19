<template lang="pug">
.reporters-list
  h2.title 報告者一覧
  .list
    el-card(v-for="(name, index) in names" :key="index" :order="name") {{ name }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class ReportersList extends Vue {
  @Prop({ default: () => [], required: true })
  names?: Array<String>;
}
</script>

<style lang="scss" scoped>
.reporters-list {
  border-right: 1px #ddd solid;
  color: #333;
  height: 100vh;
  overflow: scroll;

  .title {
    text-align: center;
    font-size: 12px;
    position: sticky;
    top: 5px;
    margin-bottom: 10px;
    background-color: #fffc;
  }

  .list {
    height: 100%;

    .el-card {
      margin: 0 5px 3px;
      font-size: 13px;

      ::v-deep .el-card__body {
        padding: 5px 7px;
      }
    }
  }
}
</style>
