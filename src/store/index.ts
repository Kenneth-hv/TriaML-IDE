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
    },
    OPEN_FILE(state) {
      state.triaMLApp.openFile();
    },
    SAVE_FILE(state) {
      state.triaMLApp.saveFile();
    },
    SAVE_FILE_AS(state) {
      state.triaMLApp.saveFileAs();
    },
    SET_SELECTED_INDEX(state, param) {
      state.triaMLApp.tabManager.setSelectedIndex(param.index);
    },
    ClOSE_SELECTED_TAB(state) {
      state.triaMLApp.tabManager.closeTab();
    }
  },
  actions: {
    NEW_FILE({ commit }) {
      commit('NEW_FILE');
    },
    OPEN_FILE({ commit }) {
      commit('OPEN_FILE');
    },
    SAVE_FILE({ commit }) {
      commit('SAVE_FILE');
    },
    SAVE_FILE_AS({ commit }) {
      commit('SAVE_FILE_AS');
    },
    SET_SELECTED_INDEX({ commit } , param) {
      commit('SET_SELECTED_INDEX', param);
    },
    ClOSE_SELECTED_TAB({ commit }) {
      commit('ClOSE_SELECTED_TAB');
    }
  },
  modules: {
  }
})

export function useStore() {
  return baseUseStore(key)
}