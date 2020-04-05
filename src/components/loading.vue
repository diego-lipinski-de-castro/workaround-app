<template>
  <div class="loader">
    <div class="inner"></div>
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style lang="stylus" scoped>

@keyframes loading {
  from {width: 0%;}
  to {width: 100%;}
}

.loader
  position absolute
  bottom 0
  width 100%
  height 5px
  background-color #121212

  .inner
    margin 0 auto
    height 5px
    background-color lighten(#121212, 38)
    animation loading 1s ease-in-out 0s infinite normal
</style>
