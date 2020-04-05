<template>
  <div class="profile">
    <div class="topnav-wrapper">
      <h1 class="title">Perfil</h1>
      <router-link class="profile-link" to="/"
        ><i class="gg-close-o"></i
      ></router-link>
    </div>

    <div class="inner">
      <div class="content">
        <div class="profile-avatar m-y-5">
          <label
            for="profile-avatar"
            :class="['label', { 'p-y-10': avatarFile == null }]"
          >
            <img
              v-if="localUser.avatar"
              :src="localUser.avatar"
              class="preview"
            />
            <img v-else-if="avatarFile" :src="avatarFile" class="preview" />
            <i v-else class="gg-profile"></i>
          </label>
          <input
            id="profile-avatar"
            type="file"
            accept="image/*"
            @change="previewAvatar"
            class="input"
          />
        </div>

        <div class="input-group">
          <label for="name">Nome</label>
          <input
            v-model="localUser.name"
            type="text"
            id="name"
            placeholder="Seu nome"
          />
        </div>

        <div class="input-group">
          <label for="email">E-mail</label>
          <input
            :value="user.email"
            type="email"
            id="email"
            placeholder="Seu email"
            readonly
          />
        </div>

        <div class="input-group">
          <label for="phone">Telefone</label>
          <input
            v-model="localUser.phone"
            type="text"
            id="phone"
            placeholder="Seu telefone"
          />
        </div>

        <button class="btn m-x-3 m-t-3" @click="handleUpdate">Salvar</button>
        <button class="btn m-x-3 m-t-3" @click="handleLogout">Sair</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "profile",
  data() {
    return {
      avatarFile: null,
      localUser: {
        name: "",
        phone: "",
        avatar: null
      }
    };
  },
  computed: {
    ...mapGetters("auth", ["user"])
  },
  methods: {
    ...mapActions("auth", ["logout", "update"]),
    handleLogout() {
      this.logout();
    },
    previewAvatar(e) {
      // preview image
      const file = e.target.files[0];
      this.avatarFile = URL.createObjectURL(file);

      // get image as base64
      const reader = new FileReader();
      reader.onload = e => (this.localUser.avatar = e.target.result);
      reader.readAsDataURL(file);
    },
    async handleUpdate() {
      try {
        await this.update(this.localUser);
      } catch (error) {
        console.log("error", error);
      }
    }
  },
  mounted() {
    this.localUser = (({ name, phone, avatar }) => ({ name, phone, avatar }))(
      this.user
    );
  }
};
</script>

<style lang="stylus" scoped>

.profile
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

      .profile-avatar
        .label
          display block
          .preview
            border-radius 50%
            width 150px
            height 150px
            display block
            margin: 0 auto
          .gg-profile
            --ggs 5
            margin: 0 auto
        .input
          display none
</style>
