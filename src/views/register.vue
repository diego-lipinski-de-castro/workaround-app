<template>
  <div class="register">
    <div class="topnav-wrapper">
      <h1 class="title">Cadastre-se</h1>
      <router-link class="register-link" to="/"
        ><i class="gg-close-o"></i
      ></router-link>
    </div>

    <div class="inner">
      <div class="content">
        <div class="input-group">
          <label for="name">Nome</label>
          <input
            v-model="data.name"
            type="text"
            id="name"
            placeholder="Seu nome"
          />
          <small
            class="input-error-helper m-t-1"
            v-if="errors && errors.name"
            v-text="errors.name[0]"
          />
        </div>

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

        <button class="btn m-x-3 m-t-3" @click="handleRegister">
          Terminar cadastro
        </button>

        <router-link to="/login" class="d-block text-center m-x-3 m-t-3"
          >Já tem uma conta? Faça login</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      data: {
        name: "teste",
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
    ...mapActions("auth", ["register"]),
    handleRegister() {
      this.errors = [];

      this.register(this.data).then(res => {
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

.register
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
