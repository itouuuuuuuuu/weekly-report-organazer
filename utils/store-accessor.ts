import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';
import Reporters from '~/store/reporters';

let reportersStore: Reporters;

function initializeStores(store: Store<any>): void {
  reportersStore = getModule(Reporters, store);
}

export {
  initializeStores,
  reportersStore
};