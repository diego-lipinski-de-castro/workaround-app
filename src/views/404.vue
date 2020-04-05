<template>
  <div class="notFound">
    <h1 class="title">Workaround</h1>
    <span class="text m-y-5">404 | Não encontramos o que procurava</span>
    <router-link class="back-btn m-t-3" to="/"
      ><i class="gg-arrow-left m-r-3"></i> Início</router-link
    >
  </div>
</template>

<script>
export default {
  name: "notFound"
};
</script>

<style lang="stylus" scoped>
.notFound
  height 100vh
  width 100vw
  display flex
  flex-direction column
  justify-content center
  align-items center

  .text
    font-weight bold

  .back-btn
    display flex
    align-items center
</style>
