import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import app from "./modules/app";
import auth from "./modules/auth";
import context from "./modules/context";

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    app,
    auth,
    context
  }
});
