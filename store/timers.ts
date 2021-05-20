
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

@Module({
  name: 'timers',
  stateFactory: true,
  namespaced: true
})
export default class Timers extends VuexModule {
  private maxSec: number = 3599;
  private initialSec: number = 0;
  private isStart: boolean = false;

  public get maxTimerSec(): number {
    return this.maxSec;
  }

  public get initialTimerSec(): number {
    return this.initialSec;
  }

  public get start(): boolean {
    return this.isStart;
  }

  @Mutation
  private set(sec: number) {
    this.initialSec = sec;
  }

  @Mutation
  private setIsStart(state: boolean) {
    this.isStart = state;
  }

  @Action
  public setInitialTimerSec(form: any) {
    this.set(form.min * 60 + form.sec);
  }

  @Action
  public setStart(state: boolean) {
    this.setIsStart(state);
  }
}