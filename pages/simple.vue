<template lang="pug">
.container
  .main-window(v-if="!isSubWindow")
    el-form(label-position="top" ref="form" :model="form" :rules="rules")
      el-form-item(label="報告者一覧（カンマ区切り）" prop="reporterNames")
        el-input(v-model="form.reporterNames" size="small" placeholder="伊藤,佐藤,田中")
    el-button.shuffle-button(type="primary" round size="small" @click="shuffle" :disabled="!hasInputedReporterNames") 並び替え
    el-button.open-subwindow-button(v-if="!isSubWindow" type="text" size="mini" @click="openSubWindow" :disabled="!hasInputedReporterNames") 別窓で開く

  .shuffled-names
    draggable(v-model="reporterNames" :options="{ animation: 100 }")
      transition-group(name="flip-list" tag="ul")
        li.name-container(v-for="(name, index) in reporterNamesWithIndex" :key="name.split('.')[1]") {{ name }}
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { reportersStore } from '@/store';

@Component
export default class Index extends Vue {
  form: any = {
    reporterNames: ''
  };

  rules: Object = {
    reporterNames: [{ required: true, message: '報告者一覧を入力してください', trigger: 'blur' }]
  };

  reporterNames: Array<String> = [];

  get reporterNamesFromJson(): Array<String> {
    return require('~/assets/json/reporters.json');
  }

  get rootPath(): String {
    return process.env.ROOT_PATH || '';
  }

  get isSubWindow(): boolean {
    return Boolean(this.$route.query.subwindow);
  }

  get inputedReporterNames(): Array<String> {
    return this.form.reporterNames.split(',');
  }

  get hasInputedReporterNames(): boolean {
    return this.inputedReporterNames.length > 0;
  }

  get reporterNamesWithIndex(): Array<String> {
    const dupReporterNames = this.$deepCopy(this.reporterNames);
    return dupReporterNames.map((name: string, i: number) => `${i + 1}. ${name}`);
  }

  get storedReporterNames() {
    return reportersStore.reporterNames;
  }

  @Watch('storedReporterNames')
  setStoredReporterNames(storedReporterNames: Array<String>) {
    if(this.isSubWindow && storedReporterNames.length > 0) {
      this.reporterNames = storedReporterNames;
    }
  }

  mounted() {
    this.form.reporterNames = this.reporterNamesFromJson.join(',');

    // 別窓で開いた場合はストアから報告者を取得
    if(this.isSubWindow) {
      this.reporterNames = reportersStore.reporterNames;
      return;
    }
    this.shuffle();
  }

  setReporterNames() {
    this.reporterNames = this.$deepCopy(this.inputedReporterNames);
  }

  // 別窓で開いたときに報告者を渡すためにストアに保存
  setReportersToStore() {
    reportersStore.setReporters(this.reporterNames);
  }

  shuffle() {
    this.setReporterNames();
    this.reporterNames = this.$_.shuffle(this.reporterNames);
  }

  openSubWindow() {
    this.setReportersToStore();
    const dx = screen.width;
    const wx = 270;
    const wy = 250;
    // window.open(`${this.rootPath}/simple?subwindow=true`,
    window.open('http://localhost:3000/simple?subwindow=true',
      'WeeklyReportOrganazer',
      `left=${dx - wx},width=${wx},height=${wy},scrollbars=yes,resizable=yes`);
  }
}
</script>

<style lang="scss">
.container {
  padding: 20px;

  .main-window {
    margin-bottom: 40px;

    .el-form-item__label {
      height: 30px;
    }

    .el-form-item {
      margin-bottom: 20px;
    }

    .open-subwindow-button {
      margin: 0 0 0 10px;
    }
  }

  .shuffled-names {
    li.name-container {
      display: inline-block;
      margin: 0 4px 12px;
      font-size: 14px;
      padding: 5px 10px;
      border-radius: 16px;
      background-color: #eaeaea;
      cursor: grab;

      &:hover {
        filter: drop-shadow(1px 1px 3px #00000062);
      }
    }

    .flip-list-move {
      transition: transform 0.5s;
    }
  }

  .open-subwindow-button {
    margin-top: 8px;
  }

  .required .el-form-item__label:before  {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
</style>
