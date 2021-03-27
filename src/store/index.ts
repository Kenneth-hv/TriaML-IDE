import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import TriaMLApp from '@/controllers/TriaMLApp'

export interface State {
  triaMLApp: TriaMLApp
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    triaMLApp: new TriaMLApp()
  },
  mutations: {
    NEW_FILE(state) {
      state.triaMLApp.newFile();
    }
  },
  actions: {
    NEW_FILE({ commit }) {
      commit('NEW_FILE');
    }
  },
  modules: {
  }
})

export function useStore() {
  return baseUseStore(key)
}