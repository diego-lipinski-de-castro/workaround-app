<template>
  <div id="ui">
    <transition mode="out-in" name="fade-in">
      <router-view class="ui-router-view" :key="$router.fullPath" />
    </transition>
  </div>
</template>

<style lang="stylus" scoped>
#ui
  position absolute
  width: 100%
  z-index 2

  .ui-router-view
    position absolute
    width: 100%
    z-index 3
</style>
