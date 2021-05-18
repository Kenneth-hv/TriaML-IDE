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
    OPEN_PREFERENCES(state) {
      state.triaMLApp.openPreferences();
    },
    CLOSE_PREFERENCES(state) {
      state.triaMLApp.closePreferences();
    },
    OPEN_ABOUT(state) {
      state.triaMLApp.openAbout();
    },
    CLOSE_ABOUT(state) {
      state.triaMLApp.closeAbout();
    },
    SET_SELECTED_INDEX(state, param) {
      state.triaMLApp.tabFileManager.selectedIndex = param;
    },
    ClOSE_TAB(state, param) {
      state.triaMLApp.tabFileManager.closeTab(param);
    },
    SET_SELECTED_TOOL(state, param) {
      state.triaMLApp.selectedTool = param;
    },
    RUN(state) {
      state.triaMLApp.run();
    },
    COMPILE(state) {
      state.triaMLApp.compile();
    },
    ZOOM_IN(state) {
      state.triaMLApp.zoomIn();
    },
    ZOOM_OUT(state) {
      state.triaMLApp.zoomOut();
    },
    ZOOM_DEFAULT(state) {
      state.triaMLApp.zoomDefault();
    },
    CLOSE(state) {
      state.triaMLApp.close();
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
    OPEN_PREFERENCES({ commit }) {
      commit('OPEN_PREFERENCES');
    },
    CLOSE_PREFERENCES({ commit }) {
      commit('CLOSE_PREFERENCES');
    },
    OPEN_ABOUT({ commit }) {
      commit('OPEN_ABOUT');
    },
    CLOSE_ABOUT({ commit }) {
      commit('CLOSE_ABOUT');
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
    RUN({ commit }) {
      commit('RUN');
    },
    ZOOM_IN({ commit }) {
      commit('ZOOM_IN');
    },
    ZOOM_OUT({ commit }) {
      commit('ZOOM_OUT');
    },
    ZOOM_DEFAULT({ commit }) {
      commit('ZOOM_DEFAULT');
    },
    CLOSE({ commit }) {
      commit('CLOSE');
    },
  },
  modules: {
  }
})

export function useStore() {
  return baseUseStore(key)
}