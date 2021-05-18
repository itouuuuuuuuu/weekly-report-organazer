
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  name: 'reporters',
  stateFactory: true,
  namespaced: true
})
export default class Reporters extends VuexModule {
  private reporters: Array<String> = [];

  @Mutation
  private set(reporters: Array<String>) {
    this.reporters = reporters;
  }

  @Mutation
  private clear() {
    this.reporters = [];
  }

  @Action
  public setReporters(reporters: Array<String>) {
    console.log(reporters);
    this.set(reporters);
  }

  @Action
  public clearReporters() {
    this.clear();
  }
}