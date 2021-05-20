import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Reporters from '~/store/reporters';
import Timers from '~/store/timers';

let reportersStore: Reporters;
let timersStore: Timers;

function initializeStores(store: Store<any>): void {
  reportersStore = getModule(Reporters, store);
  timersStore = getModule(Timers, store);
}

export {
  initializeStores,
  reportersStore,
  timersStore
};