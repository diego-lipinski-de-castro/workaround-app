<template>
  <div class="home">
    <div class="topnav-wrapper">
      <h1 class="title">Workaround</h1>
      <router-link class="profile-link" to="/profile"
        ><i class="gg-profile"></i
      ></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="stylus">

.home
  .topnav-wrapper
    position absolute
    height: 60px
    width: 100%
    display: flex
    justify-content space-between
    align-items center
    padding: 16px
</style>
