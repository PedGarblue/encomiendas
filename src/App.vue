<template>
  <div id="app">
    <Navbar />
      <transition name="fade" mode="out-in">
        <router-view v-if="showView"></router-view>
        <div v-else>
          <h2>Cargando...</h2>
        </div>
      </transition>
    <transition name="fade">
      <FloatingMessage v-if="err" context="error" :message="err" @close="clearError"/>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navbar from './components/Navbar.vue';
import FloatingMessage from './components/FloatingMessage.vue';
import { USER_REQUEST } from './store/actions/user';

export default {
  name: 'App',
  components: {
    Navbar,
    FloatingMessage,
  },
  data() {
    return {
      err: '',
    };
  },
  computed: {
    ...mapGetters(['isProfileLoaded', 'isAuthenticated']),
    showView() {
      return this.isProfileLoaded || !this.isAuthenticated;
    }
  },
  methods: {
    ...mapActions([USER_REQUEST]),
    loadUser() {
      this[USER_REQUEST]()
        .catch(err => {
          this.err = err;
        });
    },
    clearError(){
      this.err = '';
    }
  },
  mounted() {
    if(this.isAuthenticated) this.loadUser();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Satisfy&display=swap');
@import url('./assets/utils.css');

:root {
  --primary-color: #f26464;
  --secondary-color: #6eb2eb;
  --disabled-color: #bfb4b4;
  --text-color: #2c3e50;
  --small: 0.25rem;
  --medium: 1rem;
  --big: 2rem;
  --extra-big: 4rem;
}
body {
  margin: 0;
}
a {
  text-decoration: none;
  color: inherit; 
}
#app {
  font-family: 'Lato', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
}

</style>
