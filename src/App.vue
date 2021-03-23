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
:root {
  --primary-color: #f26464;
  --secondary-color: #6eb2eb;
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

/* Containers and flex */

.container {
  margin-left: 1rem;
  margin-right: 1rem;
}

.flex {
  display: flex;
}

/* Margin */

.margin-s-x { /* margin small top and bottom */
  margin-top: var(--small);
  margin-bottom: var(--small);
}

.margin-s-y { /* margin small left and right */
  margin-left: var(--small);
  margin-left: var(--small);
}

.margin-s-t { /* margin small top*/
  margin-top: var(--small);
}

.margin-s-b { /* margin small bottom */
  margin-bottom: var(--small);
}

.margin-s-l { /* margin small left */
  margin-left: var(--small);
}

.margin-s-r { /* margin small right */
  margin-right:  var(--small);
}

/* Cards */

.card {
  border: 0.15rem solid;
  border-radius: 0.15rem;
  max-width: 30rem;
  margin: 2rem auto;
}
.card-body {
  padding: 1rem 2rem;
}
.card-footer {
  padding: 1rem;
}

/* Forms */

.form-group {
  display: flex;
  flex-direction: column;
}
.form-group label {
  text-align: left;
}
.form-buttons {
  margin: 1rem 0;
}
.form-buttons .btn{
  margin: 0.25rem 0;
}

/* Buttons */

.btn {
  border: none;
  padding: 1rem;
  font-size: 1rem;
}
.btn.btn-100-width {
  width: 100%;
}
.btn.btn-75-width {
  width: 75%;
}
.btn.btn-50-width {
  width: 50%;
}
.btn.btn-25-width {
  width: 25%;
}
.btn.btn-primary {
  background-color: var(--primary-color);
  color: white;
}
.btn.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

@media screen and (min-width: 600px) {
  .container {
    margin-left: 10rem;
    margin-right: 10rem;
  }
}

/* Animations and transitions */

.fade-enter-active {
  animation: fade-in 0.5s;
}
.fade-leave-active {
  animation: fade-in 0.5s reverse;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
