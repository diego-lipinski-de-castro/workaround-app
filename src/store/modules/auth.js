import * as auth from "@/services/auth";
import { add as addCookie, remove as removeCookie } from "@/utils/cookies";
import { add, remove } from "@/utils/storage";

const SET_USER = "SET_USER";

const state = {
  user: null
};

const mutations = {
  [SET_USER](state, user) {
    state.user = user;
  }
};

const actions = {
  async login({ commit }, payload) {
    commit("app/SET_LOADING", true, { root: true });

    try {
      const { access_token } = await auth.login(payload);

      addCookie("token", access_token);

      const user = await auth.user();

      add("user", user);

      commit(SET_USER, user);
    } catch (error) {
      commit(SET_USER, null);

      return error;
    } finally {
      commit("app/SET_LOADING", false, { root: true });
    }
  },

  async logout({ commit }) {
    commit("app/SET_LOADING", true, { root: true });

    try {
      await auth.logout();
    } catch (error) {
      console.log("logout error", error);
    } finally {
      removeCookie("token");
      remove("user");

      commit(SET_USER, null);
      commit("app/SET_LOADING", false, { root: true });
    }
  },

  async register({ commit }, payload) {
    commit("app/SET_LOADING", true, { root: true });

    try {
      const { access_token } = await auth.register(payload);

      addCookie("token", access_token);

      const user = await auth.user();

      add("user", user);

      commit(SET_USER, user);
    } catch (error) {
      commit(SET_USER, null);

      return error;
    } finally {
      commit("app/SET_LOADING", false, { root: true });
    }
  },

  async update({ commit }, payload) {
    commit("app/SET_LOADING", true, { root: true });

    try {
      await auth.update(payload);

      const user = await auth.user();

      add("user", user);

      commit(SET_USER, user);
    } catch (error) {
      return error;
    } finally {
      commit("app/SET_LOADING", false, { root: true });
    }
  }
};

const getters = {
  loggedIn: state => state.user != null,
  user: state => state.user
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
