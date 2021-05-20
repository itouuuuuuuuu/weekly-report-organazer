<template lang="pug">
.reporters-list(v-if="names.length > 0")
  .header
    h2.title 報告者
    i.el-icon-refresh(@click="shuffle")
  .list
    transition-group(name="flip-list" tag="ul")
      li(v-for="name in displayNames" :key="name") {{ name }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class ReportersList extends Vue {
  @Prop({ default: () => [], required: true })
  names?: Array<String>;

  displayNames: Array<String> = [];

  shuffle() {
    this.displayNames = this.$_.shuffle(this.displayNames);
  }

  mounted() {
    this.displayNames = this.$deepCopy(this.names);
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
  color: #555;

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
      border: 1px solid #f3f3f3;
      margin: 0 5px 5px;
      font-size: 13px;
      padding: 5px 7px;
      border-radius: 4px;
      background-color: #fff;
      filter: drop-shadow(2px 2px 4px #00000023);
      cursor: pointer;

      &:hover {
        filter: drop-shadow(2px 2px 4px #00000062);
        font-weight: bold;
      }
    }
  }
}
</style>
