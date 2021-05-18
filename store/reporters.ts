
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  name: 'reporters',
  stateFactory: true,
  namespaced: true
})
export default class Reporters extends VuexModule {
  private names: Array<String> = [];

  public get hasReporters(): boolean {
    return this.names.length > 0;
  }

  public get namesString(): String {
    return this.names.join(',');
  }

  public get reporterNames(): Array<String> {
    return this.names;
  }

  @Mutation
  private set(reporters: Array<String>) {
    this.names = reporters.filter(Boolean);
  }

  @Mutation
  private clear() {
    this.names = [];
  }

  @Action
  public setReporters(reporters: Array<String>) {
    this.set(reporters);
  }

  @Action
  public clearReporters() {
    this.clear();
  }
}