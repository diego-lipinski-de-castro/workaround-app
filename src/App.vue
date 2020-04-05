<template>
  <div id="app" :data-theme="theme">
    <ui />
    <!-- <mapbox /> -->
    <loading v-if="isLoading" />
    <connectivity />
  </div>
</template>

<script>
// import mapbox from "@/components/mapbox";

import { mapGetters, mapMutations } from "vuex";

import connectivity from "@/components/connectivity";
import loading from "@/components/loading";
import ui from "@/components/ui";
import { get } from "@/utils/storage";
import { initThemeHandler, destroyThemeHandler } from "@/utils/theme";

export default {
  name: "app",
  components: {
    // mapbox,
    ui,
    loading,
    connectivity,
  },
  computed: {
    ...mapGetters("app", ["theme", "isLoading", "isOffline"]),
    ...mapGetters("auth", ["loggedIn"]),
  },
  watch: {
    loggedIn(newValue, oldValue) {
      console.log(newValue, oldValue);
    },
  },
  methods: {
    ...mapMutations("auth", {
      setUser: "SET_USER",
    }),
  },
  mounted() {
    initThemeHandler();

    get("user").then((user) => this.setUser(user));
  },
  beforeDestroy() {
    destroyThemeHandler();
  },
};
</script>

<style lang="stylus">
@import './assets/styles/app.styl';
</style>
