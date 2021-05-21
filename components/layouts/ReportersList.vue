<template lang="pug">
.reporters-list
  .header
    h2.title 報告者
    div(:class="{ disabled: starting }")
      i.el-icon-refresh(@click="shuffle")
  .list
    div(:class="{ disabled: starting }")
      transition-group(name="flip-list" tag="ul")
        li(v-for="(name, index) in displayNames" :key="name"
          :class="{ 'is-actice': isCurrentReporter(index) }"
          @click="setReporterIndex(index)") {{ name }}
</template>

<script lang="ts">
import { Component, Vue, PropSync } from 'nuxt-property-decorator';
import { timersStore } from '@/store';

@Component
export default class ReportersList extends Vue {
  @PropSync('names', { default: () => [], required: true })
  displayNames!: Array<String>;

  @PropSync('currentReporterIndex', { required: true })
  reporterIndex!: number;

  get starting(): boolean {
    return timersStore.start;
  }

  shuffle() {
    this.reporterIndex = 0;
    this.displayNames = this.$_.shuffle(this.displayNames);
  }

  setReporterIndex(index: number) {
    this.reporterIndex = index;
  }

  isCurrentReporter(index: number) {
    return this.reporterIndex === index;
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
  color: #555;

  .disabled {
    cursor: not-allowed;

    > * {
      pointer-events: none;
      opacity: 0.7;
    }
  }

  .is-actice {
    font-weight: bold !important;
  }

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
      margin: 0 4px 4px;
      font-size: 12px;
      padding: 3px 7px;
      border-radius: 4px;
      background-color: #fff;
      filter: drop-shadow(1px 1px 3px #00000023);
      cursor: pointer;

      &:hover {
        filter: drop-shadow(1px 1px 3px #00000062);
      }
    }
  }
}
</style>
