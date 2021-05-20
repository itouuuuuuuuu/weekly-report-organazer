
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  name: 'timers',
  stateFactory: true,
  namespaced: true
})
export default class Timers extends VuexModule {
  private maxSec: number = 3599;
  private initialSec: number = 0;

  public get maxTimerSec(): number {
    return this.maxSec;
  }

  public get initialTimerSec(): number {
    return this.initialSec;
  }

  @Mutation
  private set(sec: number) {
    this.initialSec = sec;
  }

  @Action
  public setInitialTimerSec(form: any) {
    this.set(Number(form.min) * 60 + Number(form.sec));
  }
}