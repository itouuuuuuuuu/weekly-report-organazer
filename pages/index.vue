<template lang="pug">
  .container
    .initial(v-if="!isSubWindow")
      main-header
      el-form(label-position="top" ref="form" :model="form" :rules="rules")
        el-form-item(label="報告者一覧（カンマ区切り）" prop="reporterStringNames")
          el-input(v-model="form.reporterStringNames" size="small" @blur="setReporters" placeholder="伊藤,佐藤,田中")
        el-form-item.required(label="初期設定時間")
          .timer-setting
            el-form-item(prop="min")
              el-input-number(v-model="form.min" controls-position="right" size="small" :min="0" :max="59")
            span.unit 分
            el-form-item(prop="sec")
              el-input-number(v-model="form.sec" controls-position="right" size="small" :min="0" :max="59")
            span.unit 秒
      p.description ボタンを押してタイマーを表示します。
      p.note * ブラウザをフルスクリーン表示している場合は、適切なサイズで表示されない場合があります。
      el-button.start-button(type="primary" round @click="showTimer" :disabled="hasNoTime") タイマーを表示する
      a.version(href="https://github.com/itouuuuuuuuu/weekly-report-organazer" target="_blank") {{ appVersion }}
    .content(v-else)
      reporters-list(:names.sync="reporterNames" :current-reporter-index.sync="currentReporterIndex")
      .timer-container
        p.current-reporter(v-html="displayMessage")
        timer(:current-reporter-index.sync="currentReporterIndex")
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { timersStore, reportersStore } from '@/store';

@Component
export default class Index extends Vue {
  form: any = {
    reporterStringNames: '高橋,古澤(201904),伊藤(202105),平川(201708),森田(201903),光吉(202004),笹木,金谷,田村,武田,井手',
    min: 3,
    sec: 0
  };

  rules: Object = {
    reporterStringNames: [{ required: true, message: '報告者一覧を入力してください', trigger: 'blur' }],
    min: [{ required: true, message: '分を入力してください', trigger: 'change' }],
    sec: [{ required: true, message: '秒を入力してください', trigger: 'change' }]
  };

  currentReporterIndex: number = 0;
  reporterNames: Array<String> = [];

  get rootPath(): String {
    return process.env.ROOT_PATH || '';
  }

  get appVersion(): String {
    return process.env.APP_VER || '';
  }

  get isSubWindow(): boolean {
    return Boolean(this.$route.query.subwindow);
  }

  get hasNoTime(): boolean {
    return this.form.min === 0 && this.form.sec === 0;
  }

  get allReporterFinished(): boolean {
    return this.currentReporterIndex > this.storedReporterNames.length - 1;
  }

  get displayMessage(): string {
    if(this.allReporterFinished) {
      return '全員の報告が完了しました';
    }
    if(this.currentReporterIndex === 0) {
      return `<strong>${this.currentReporterName}</strong> さんの番です`;
    }
    return `次は <strong>${this.currentReporterName}</strong> さんの番です`;
  }

  get inputedReporterNames(): Array<String> {
    return this.form.reporterStringNames.split(',');
  }

  get hasReporters(): boolean {
    if(reportersStore?.hasReporters === undefined || reportersStore.hasReporters === null) return false;
    return reportersStore.hasReporters;
  }

  get currentReporterName(): String {
    return this.reporterNames[this.currentReporterIndex];
  }

  get storedReporterNames() {
    return reportersStore.reporterNames;
  }

  showTimer() {
    (this.$refs.form as any).validate((valid: boolean) => {
      if(valid) {
        timersStore.setInitialTimerSec(this.form);
        this.setReporters();
        window.open(`${this.rootPath}?subwindow=true`,
          'WeeklyReportOrganazer',
          'width=370,height=225,scrollbars=yes,resizable=yes');
      }
    });
  }

  setReporters() {
    reportersStore.setReporters(this.inputedReporterNames);
  }

  @Watch('storedReporterNames')
  setReporterNames(val: Array<String>) {
    if(val.length > 0) {
      this.reporterNames = val;
    }
  }

  @Watch('starting')
  test(val: boolean) {
    console.log(val);
  }

  @Watch('hasReporters')
  setNamesToForm(val: boolean) {
    if(val) {
      this.form.reporterStringNames = reportersStore.reporterStringNames;
    } else {
      this.$message.error('入力項目に誤りがあります');
    }
  }
}
</script>

<style lang="scss">
.container {

  .initial {
    padding: 20px;

    .el-form-item__label {
      padding: 0;
      height: 30px;
    }

    .timer-setting {
      display: flex;
      align-items: center;

      .unit {
        padding: 0 15px 0 5px;
      }
    }

    .description {
      margin-top: 30px;
      font-size: 14px;
    }

    .note {
      margin-top: 5px;
      font-size: 12px;
      color: #e72e2e;
    }

    .start-button {
      margin-top: 30px;
    }

    .version {
      display: block;
      margin-top: 40px;
      color: #575757;
      font-size: 12px;
    }
  }

  .content {
    max-width: 370px;
    display: flex;

    .reporters-list {
      min-width: 95px;
      max-width: 200px;
      width: 15%;
    }

    .timer-container {
      margin: 0 auto;

      .current-reporter {
        text-align: center;
        margin: 15px 0 10px;
      }
    }
  }

  .required .el-form-item__label:before  {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
</style>
