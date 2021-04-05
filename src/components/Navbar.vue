<template>
  <nav>
    <a href="/" class="flex brand">
      <span>Encomiendas</span>
    </a>
    <div class="flex items">
      <div v-if="isProfileLoaded" class="flex">
        <router-link v-if="isAdmin" :to="{ name: 'Manage' }" class="btn btn-secondary">
          Manage
        </router-link>
        <span
          @click="logout"
          class="btn btn-primary flex flex-center"
        >
          <i class="icon-exit"></i>
        </span>
        <div class="flex user">
          <div class="user__picture" :title="getProfile.name">
            <img :src="userPictureUrl" alt="">
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { USER_LOGOUT } from '../store/actions/user';

export default {
  name: 'Navbar',
  components: {},
  computed: {
    ...mapGetters(['isProfileLoaded', 'getProfile']),
    isAdmin() {
      return this.getProfile.role === 'admin';
    },
    userPictureUrl() {
      const defaultsPicsUrls = {
        admin: () => require('../assets/default-profile.png'),
        user: () => require('../assets/default-profile.png'),
      };
      const defaultPicture = defaultsPicsUrls[this.getProfile.role]();
      return this.getProfile.picture || defaultPicture;
    },
  },
  methods: {
    ...mapActions([USER_LOGOUT]),
    logout() {
      this[USER_LOGOUT]()
        .then(() => {
          this.$router.push({ name: 'Login' });
        })
    },
  }
}
</script>

<style scoped>
nav {
  display: flex;
  background-color: var(--primary-color);
}

i {
  font-size: 1.3rem;
}

.brand {
  font-family: 'Satisfy', cursive;
  font-size: 2em;
  color: white;
  margin: 0.2em 2rem;
}

.brand img {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.6rem;
}

.items {
  margin-left: auto;
}

.item {
  height: 100%;
}

.user {
  align-items: center;
  padding: 0 0.5rem;
}
.user__name {
  font-weight: bolder;
  background-color: var(--secondary-color);
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: default;
}

.user__picture {
  padding: var(--small);
  border: 0.15rem solid #aeaeae;
  background-color: var(--complementary-background);
  border-radius: 50%;
  height: 2.2rem;
  width: 2.2rem;
  display: flex;
  justify-content: center;
}
.user__picture img {
  width: 2rem;
  height: 2rem;
}
</style>