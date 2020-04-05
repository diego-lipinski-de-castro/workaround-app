<template>
  <div class="loading-overlay">
    <h1 class="title" id="title">
      <span class="letter">W</span>
      <span class="letter">o</span>
      <span class="letter">r</span>
      <span class="letter">k</span>
      <span class="letter">a</span>
      <span class="letter">r</span>
      <span class="letter">o</span>
      <span class="letter">u</span>
      <span class="letter">n</span>
      <span class="letter" id="last-letter">d</span>
    </h1>
    <i class="m-t-5 gg-loadbar"></i>
  </div>
</template>

<script>
export default {
  name: "loading-overlay",
  methods: {
    restartAnimation() {
      const title = document.getElementById("title");

      title.children.forEach(span => {
        span.classList.remove("letter");
        void span.offsetWidth;
        span.classList.add("letter");
      });
    }
  },
  mounted() {
    const lastLetter = document.getElementById("last-letter");

    lastLetter.addEventListener("animationend", this.restartAnimation);
  },
  beforeDestroy() {
    const lastLetter = document.getElementById("last-letter");

    if (lastLetter) {
      lastLetter.removeEventListener("animationend", this.restartAnimation);
    }
  }
};
</script>

<style lang="stylus" scoped>

@keyframes jump-letter {
  0% {transform: translateY(0px);}
  50% {transform: translateY(-5px);}
  100% {transform: translateY(0px);}
}

.loading-overlay
  height 100vh
  width 100vw
  display flex
  flex-direction column
  justify-content center
  align-items center

  .title
    for num in (1..10)
      span.letter:nth-child({num})
        display inline-block
        animation: jump-letter 1000ms ease-in-out (500 * num)ms 1 normal
</style>
