<template lang="pug">
.timer
  .display 3:00
  .button-panel
    .row
      el-button.min-10(type="primary" size="mini" plain round) 10分
      el-button.min-1(type="primary" size="mini" plain round) 1分
      el-button.sec-10(type="primary" size="mini" plain round) 10秒
      el-button.sec-1(type="primary" size="mini" plain round) 1秒
    .row
      el-button.reset(type="primary" size="small" round) リセット
      el-button.toggle-start(type="primary" round) 開始
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class Timer extends Vue {
  // @Prop({ default: () => [], required: true })
  // names?: Array<String>;

  // shuffle() {
  //   this.names = this.$_.shuffle(this.names);
  // }

  // mounted() {
  //   setTimeout(() => {
  //     this.shuffle();
  //   }, 500);
  // }
}
</script>

<style lang="scss">
.timer {

  .display {
    text-align: center;
    font-size: 60px;
    color: #555;
    margin-bottom: 20px;
  }

  .button-panel {

    .row {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }

    .reset, .toggle-start {
      width: 100%;
    }
  }
}
</style>
