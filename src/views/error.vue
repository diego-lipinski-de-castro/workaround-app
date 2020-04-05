<template>
  <div class="error">
    <h1 class="title">Workaround</h1>
    <span class="text m-y-5">Houve um erro ao carregar essa página</span>
    <span class="p-10" @click="$router.go()">
      <i class="gg-redo"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "error"
};
</script>

<style lang="stylus" scoped>
.error
  height 100vh
  width 100vw
  display flex
  flex-direction column
  justify-content center
  align-items center

  .text
    font-weight bold

  .gg-redo
    --ggs 2
</style>
