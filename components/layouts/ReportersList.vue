<template lang="pug">
.reporters-list
  .header
    h2.title 報告者
    i.el-icon-refresh(@click="shuffle")
  .list
    transition-group(name="flip-list" tag="ul")
      li(v-for="name in names" :key="name") {{ name }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class ReportersList extends Vue {
  @Prop({ default: () => [], required: true })
  names?: Array<String>;

  shuffle() {
    this.names = this.$_.shuffle(this.names);
  }

  mounted() {
    setTimeout(() => {
      this.shuffle();
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.reporters-list {
  border-right: 1px #ddd solid;
  color: #333;
  height: 100vh;
  overflow: scroll;

  .flip-list-move {
    transition: transform 0.5s;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 5px;
    margin-bottom: 10px;
    background-color: #fffc;
    z-index: 200;

    .title {
      text-align: center;
      font-size: 14px;
      padding-right: 5px;
      color: #555;
    }

    i {
      transition: opacity 0.1s;
      cursor: pointer;
      font-size: 16px;

      &:hover {
        opacity: 0.3;
      }

      &:active {
        opacity: 0.5;
      }
    }
  }

  .list {
    height: 100%;

    li {
      margin: 0 5px 3px;
      font-size: 13px;
      padding: 5px 7px;
      border-radius: 4px;
      background-color: #fff;
      filter: drop-shadow(3px 3px 5px #0000002c);
    }
  }
}
</style>
