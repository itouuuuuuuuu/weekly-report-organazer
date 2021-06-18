<template lang="pug">
.timer
  .display(:class="{ finished: finished }") {{ displayTime }}
  .button-panel
    .row
      el-button.min-10(type="primary" size="mini" plain round :disabled="starting" @click="addSecToTimer(600)") ＋10分
      el-button.min-1(type="primary" size="mini" plain round :disabled="starting" @click="addSecToTimer(60)") ＋1分
    .row
      el-button.sec-10(type="primary" size="mini" plain round :disabled="starting" @click="addSecToTimer(10)") ＋10秒
      el-button.sec-1(type="primary" size="mini" plain round :disabled="starting" @click="addSecToTimer(1)") ＋1秒
    .row
      el-button.reset(type="danger" plain round :disabled="starting" @click="reset") リセット
    .row
      el-button.toggle-start(type="primary" round :icon="toggleStartIcon" @click="toggleStart" :disabled="finished") {{ toggleStartText }}
</template>

<script lang="ts">
import { Component, Vue, Watch, PropSync } from 'nuxt-property-decorator';
import { timersStore } from '@/store';

@Component
export default class Timer extends Vue {
  timerSec: number = 0;
  intervalId: any = null;
  starting: boolean = false;

  @PropSync('currentReporterIndex', { required: true })
  reporterIndex!: number;

  get displayTime(): string {
    let min = String(Math.floor(this.timerSec / 60));
    let sec = String(this.timerSec % 60);
    if(sec.length === 1) sec = `0${sec}`;
    if(min === '-1') min = '0';
    if(sec === '-1') sec = '00';
    return `${min}:${sec}`;
  }

  get finished(): boolean {
    return this.timerSec <= 0;
  }

  get toggleStartIcon(): string {
    return this.starting ? 'el-icon-video-pause' : 'el-icon-video-play';
  }

  get toggleStartText(): string {
    return this.starting ? '停止' : '開始';
  }

  @Watch('timerSec')
  incrementReporterIndex(val: number) {
    if(val === 0) {
      this.reporterIndex++;
    }
  }

  @Watch('starting')
  setStarting(val: boolean) {
    timersStore.setStart(val);
  }

  @Watch('finished')
  setNamesToForm(val: boolean, oldVal: boolean) {
    if(val && !oldVal) {
      this.starting = false;
    }
  }

  mounted() {
    this.reset();
  }

  toggleStart() {
    const that = this;
    this.starting = !this.starting;

    if(!this.starting) {
      if(this.intervalId) clearInterval(this.intervalId!);
      return;
    }

    let currentDate = new Date();
    const endDate = new Date(currentDate.getTime() + this.timerSec * 1000);
    this.intervalId = setInterval(function() {
      if(that.timerSec >= 0) that.timerSec--;
      currentDate = new Date();
      if(currentDate.getTime() >= endDate.getTime()) {
        clearInterval(that.intervalId);
      }
    }, 1000);
  }

  addSecToTimer(sec: number) {
    this.timerSec += sec;
    if(this.timerSec > timersStore.maxTimerSec) this.timerSec = timersStore.maxTimerSec;
  }

  reset() {
    this.timerSec = timersStore.initialTimerSec;
  }
}
</script>

<style lang="scss">
.timer {
  width: 100%;
  padding: 0 10px;

  .display {
    text-align: center;
    font-size: 50px;
    color: #555;
    margin-bottom: 20px;
  }

  .button-panel {

    .row {
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }

    .el-button {
      width: 100%;
    }
  }

  .finished {
    color: #db0000;
  }
}
</style>
