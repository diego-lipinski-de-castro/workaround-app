<template>
  <div class="connectivity" :style="{ display: containerDisplay }">
    <span
      class="inner"
      :style="{ 'background-color': backgroundColor }"
      v-text="connectionText"
    ></span>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { mapGetters } from "vuex";

import {
  initConnectivityHandler,
  destroyConnectivityHandler,
} from "@/utils/connection";

export default {
  name: "connectivity",
  data() {
    return {
      showContainer: false,
    };
  },
  computed: {
    ...mapGetters("app", ["isOffline"]),
    containerDisplay() {
      return this.showContainer ? "block" : "none";
    },
    backgroundColor() {
      return this.isOffline ? "rgb(255, 63, 63)" : "#313131";
    },
    connectionText() {
      return this.isOffline ? "Sem conexão" : "Conectado";
    },
  },
  watch: {
    isOffline() {
      this.popupAndRemove();
    },
  },
  methods: {
    popupAndRemove() {
      anime({
        targets: ".inner",
        translateY: 0,
        begin: () => {
          this.showContainer = true;
        },
        complete: () => {
          setTimeout(() => {
            anime({
              targets: ".inner",
              translateY: 30,
              complete: () => {
                this.showContainer = false;
              },
            });
          }, 5000);
        },
      });
    },
  },
  mounted() {
    initConnectivityHandler();
  },
  beforeDestroy() {
    destroyConnectivityHandler();
  },
};
</script>

<style lang="stylus" scoped>
.connectivity
  position absolute
  bottom 0
  width 100%
  height 30px
  overflow hidden

  .inner
    height 100%
    display flex
    justify-content center
    align-items center
    transform translateY(30px)
    color white
</style>
