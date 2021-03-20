<template>
  <nav>
    <a href="/" class="flex brand">
      <img src="https://img.icons8.com/cotton/64/000000/scooter--v4.png"/>
      <span>Encomiendas</span>
    </a>
    <div class="flex items">
      <div v-if="isProfileLoaded" class="flex">
        <button @click="logout" class="btn btn-primary">Log out</button>
        <div class="flex user">
          <span class="user__name" :title="getProfile.role">{{ getProfile.name }}</span>
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
  computed: {
    ...mapGetters(['isProfileLoaded', 'getProfile']),
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

<style>
nav {
  display: flex;
  background-color: var(--primary-color);
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
  padding: 0 1rem;
}
.user__name {
  font-weight: bolder;
  background-color: var(--secondary-color);
  padding: 0.5rem;
  border-radius: 0.3rem;
  cursor: default;
}
</style>