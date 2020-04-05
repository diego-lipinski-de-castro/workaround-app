<template>
  <div class="login">
    <div class="topnav-wrapper">
      <h1 class="title">Entrar</h1>
      <router-link class="login-link" to="/"
        ><i class="gg-close-o"></i
      ></router-link>
    </div>

    <div class="inner">
      <div class="content">
        <div class="input-group">
          <label for="email">E-mail</label>
          <input
            v-model="data.email"
            type="email"
            id="email"
            placeholder="Seu email"
          />
          <small
            class="input-error-helper m-t-1"
            v-if="errors && errors.email"
            v-text="errors.email[0]"
          />
        </div>

        <div class="input-group">
          <label for="password">Senha</label>
          <input
            v-model="data.password"
            :type="passwordFieldType"
            id="password"
            placeholder="Sua senha"
          />
          <small
            class="input-error-helper m-t-1"
            v-if="errors && errors.password"
            v-text="errors.password[0]"
          />
        </div>

        <button class="btn m-x-3 m-t-3" @click="handleLogin">Entrar</button>

        <router-link to="/register" class="d-block text-center m-x-3 m-t-3"
          >Cadastre-se</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "login",
  data() {
    return {
      data: {
        email: "teste@teste.com.br",
        password: "123456"
      },
      isPasswordVisible: false,
      errors: []
    };
  },
  computed: {
    passwordFieldType() {
      return this.isPasswordVisible ? "text" : "password";
    }
  },
  methods: {
    ...mapActions("auth", ["login"]),
    handleLogin() {
      this.errors = [];

      this.login(this.data).then(res => {
        if (res !== undefined) {
          this.errors = res.errors;
        } else {
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>

.login
  .topnav-wrapper
    position absolute
    height: 60px
    width: 100%
    display: flex
    justify-content space-between
    align-items center
    padding: 16px

  .inner
    margin-top: 60px
    padding: 20px

    .content
      display flex
      flex-direction column
</style>
