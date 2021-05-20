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
      el-button.start-button(type="primary" round @click="showTimer") タイマーを表示する
      a.version(href="https://github.com/itouuuuuuuuu/weekly-report-organazer" target="_blank") {{ appVersion }}
    .content(v-else)
      reporters-list(:names.sync="reporterNames")
      .timer-container
        p.current-reporter A さんの番です
        timer
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { timersStore, reportersStore } from '@/store';

@Component
export default class Index extends Vue {
  form: any = {
    reporterStringNames: '伊藤,佐藤,田中,aaa,bbb,ccc,ddd,eee,fff,ggg',
    min: '3',
    sec: '0'
  };

  rules: Object = {
    reporterStringNames: [{ required: true, message: '報告者一覧を入力してください', trigger: 'blur' }],
    min: [{ required: true, message: '分を入力してください', trigger: 'change' }],
    sec: [{ required: true, message: '秒を入力してください', trigger: 'change' }]
  };

  get rootPath(): string {
    return process.env.ROOT_PATH || '';
  }

  get appVersion(): string {
    return process.env.APP_VER || '';
  }

  get isSubWindow(): boolean {
    return Boolean(this.$route.query.subwindow);
  }

  get inputedReporterNames(): Array<String> {
    return this.form.reporterStringNames.split(',');
  }

  get hasReporters(): boolean {
    if(reportersStore?.hasReporters === undefined || reportersStore.hasReporters === null) return false;
    return reportersStore.hasReporters;
  }

  get reporterNames(): Array<String> {
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
  max-width: 370px;

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
