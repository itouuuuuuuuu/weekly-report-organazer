<template lang="pug">
  .container
    .initial(v-if="!isSubWindow")
      main-header
      el-form(ref="form" :model="form" :rules="rules")
        el-form-item(label="報告者一覧（カンマ区切り）" prop="reportersString")
          el-input(v-model="form.reportersString" @blur="setReporters" placeholder="伊藤,佐藤,田中")
      p.description ボタンを押してタイマーを表示します。
      p.note * ブラウザをフルスクリーン表示している場合は、適切なサイズで表示されない場合があります。
      el-button.start-button(type="primary" round @click="showTimer") タイマーを表示する
    .content(v-else)
      p test
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { reportersStore } from '@/store';

@Component
export default class Index extends Vue {
  form: any = {
    reportersString: '伊藤,佐藤,田中'
  };

  rules: Object = {
    reportersString: [{ required: true, message: '報告者一覧を入力してください', trigger: 'blur' }]
  };

  get rootPath(): string {
    return process.env.ROOT_PATH || '';
  }

  get isSubWindow(): boolean {
    return Boolean(this.$route.query.subwindow);
  }

  get reporters(): Array<String> {
    return this.form.reportersString.split(',');
  }

  mounted() {
    // if(!this.isSubWindow) return;
  }

  showTimer() {
    (this.$refs.form as any).validate((valid: boolean) => {
      if(valid) {
        window.open(`${this.rootPath}?subwindow=true`,
          'WeeklyReportOrganazer',
          'width=300,height=200,scrollbars=yes,resizable=yes');
      }
    });
  }

  setReporters() {
    console.log('setReporters');
    reportersStore.setReporters(this.reporters);
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
}
</style>
