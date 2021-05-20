import Vue from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $_: any
    $scrollTo(id: string): void
    $deepCopy(target: any): any
  }
}
