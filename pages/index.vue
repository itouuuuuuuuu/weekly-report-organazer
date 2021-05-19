<template lang="pug">
  .container
    .initial(v-if="!isSubWindow")
      main-header
      el-form(ref="form" :model="form" :rules="rules")
        el-form-item(label="報告者一覧（カンマ区切り）" prop="reporterStringNames")
          el-input(v-model="form.reporterStringNames" @blur="setReporters" placeholder="伊藤,佐藤,田中")
      p.description ボタンを押してタイマーを表示します。
      p.note * ブラウザをフルスクリーン表示している場合は、適切なサイズで表示されない場合があります。
      el-button.start-button(type="primary" round @click="showTimer") タイマーを表示する
    .content(v-else)
      reporters-list(:names="reporterNames")
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { reportersStore } from '@/store';

@Component
export default class Index extends Vue {
  form: any = {
    reporterStringNames: '伊藤,佐藤,田中'
  };

  rules: Object = {
    reporterStringNames: [{ required: true, message: '報告者一覧を入力してください', trigger: 'blur' }]
  };

  get rootPath(): string {
    return process.env.ROOT_PATH || '';
  }

  get isSubWindow(): boolean {
    return Boolean(this.$route.query.subwindow);
  }

  get inputedReporterNames(): Array<String> {
    return this.form.reporterStringNames.split(',');
  }

  get hasReporters(): boolean {
    return reportersStore.hasReporters;
  }

  get reporterNames(): Array<String> {
    return reportersStore.reporterNames;
  }

  mounted() {
    // if(!this.isSubWindow) {
    // }
  }

  showTimer() {
    (this.$refs.form as any).validate((valid: boolean) => {
      if(valid) {
        this.setReporters();
        window.open(`${this.rootPath}?subwindow=true`,
          'WeeklyReportOrganazer',
          'width=400,height=250,scrollbars=yes,resizable=yes');
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
  .initial {
    padding: 20px;

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
  }

  .content {

    .reporters-list {
      min-width: 120px;
      max-width: 200px;
      width: 15%;
    }
  }
}
</style>
