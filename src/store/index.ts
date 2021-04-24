import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import TriaMLApp from '@/controllers/TriaMLApp'
import { Tool } from '@/controllers/TriaMLApp'

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
      state.triaMLApp.tabManager.setSelectedIndex(param);
    },
    ClOSE_TAB(state, param) {
      state.triaMLApp.tabManager.closeTab(param);
    },
    SET_SELECTED_TOOL(state, param) {
      state.triaMLApp.selectedTool = param;
    },
    COMPILE(state) {
      state.triaMLApp.tabManager.compile();
    },
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
    SET_SELECTED_INDEX({ commit }, param) {
      commit('SET_SELECTED_INDEX', param);
    },
    ClOSE_TAB({ commit }, param) {
      commit('ClOSE_TAB', param);
    },
    SET_SELECTED_TOOL({ commit }, param) {
      commit('SET_SELECTED_TOOL', param);
    },
    COMPILE({ commit }) {
      commit('COMPILE');
    },
  },
  modules: {
  }
})

export function useStore() {
  return baseUseStore(key)
}