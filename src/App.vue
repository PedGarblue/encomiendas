<template>
  <div id="app">
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view v-if="showView" id="view"></router-view>
      <div v-else>
        <h2>Cargando...</h2>
      </div>
    </transition>
    <Footer class="margin-a-t"/>
    <transition name="fade">
      <FloatingMessage v-if="err" context="error" :message="err" @close="clearError"/>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Navbar from './components/Navbar.vue';
import FloatingMessage from './components/FloatingMessage.vue';
import { USER_LOAD } from './store/actions/user';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    FloatingMessage,
    Footer,
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
    ...mapActions([USER_LOAD]),
    loadUser() {
      this[USER_LOAD]()
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
@import url('./assets/icons.css');
@import url('./assets/utils.css');

:root {
  --primary-color: #f26464;
  --primary-light-color: #f77979;
  --secondary-color: #6eb2eb;
  --secondary-light-color: #9ad1ff;
  --terciary-color: #fbf8f8;
  --complementary-background: #f7f7f7;
  --complementary-terciary-color: #e8e8e8;
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
#view {
  min-height: calc(100vh - 11rem);
}
</style>
