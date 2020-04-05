import { add } from "@/utils/storage";

const SET_LOADING = "SET_LOADING";
const SET_OFFLINE = "SET_OFFLINE";
const SET_THEME = "SET_THEME";
const SET_MAPBOX_THEME = "SET_MAPBOX_THEME";

const state = {
  loading: false,
  offline: !navigator.onLine,
  theme: "light",
  mapboxTheme: "light-v10"
};

const mutations = {
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [SET_OFFLINE](state, isOffline) {
    state.offline = isOffline;
  },
  [SET_THEME](state, theme) {
    state.theme = theme;
  },
  [SET_MAPBOX_THEME](state, theme) {
    state.mapboxTheme = theme;
  }
};

const actions = {
  setTheme({ commit }, payload) {
    switch (payload) {
      case "light":
        commit(SET_THEME, "light");
        commit(SET_MAPBOX_THEME, "light-v10");
        break;
      case "dark":
        commit(SET_THEME, "dark");
        commit(SET_MAPBOX_THEME, "dark-v10");
        break;
      default:
        commit(SET_THEME, "light");
        commit(SET_MAPBOX_THEME, "light-v10");
        break;
    }

    add("theme", payload);
  }
};

const getters = {
  isLoading: state => state.loading,
  isOffline: state => state.offline,
  theme: state => state.theme,
  mapboxTheme: state => state.mapboxTheme
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
