<template>
  <div id="app">
    <Navbar />
    <div>
      <p>
        Seleccione un horario para solicitar a un motociclista
      </p>
    </div>
    <div>
      <section id="avaliable-items" class="container">
        <div v-if="hourlist" class="hour-list">
          <div v-for="(hour, hourid) in hourlist" :key="hourid">
            <HourBlock 
              v-if="hour.avaliableItems > 0"
              :id="hourid"
              @block-error="showError"/>
          </div>
        </div>
      </section>
    </div>
    <transition name="fade">
      <FloatingMessage v-if="err" context="error" :message="err" @close="clearError"/>
    </transition>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import HourBlock from './components/HourBlock.vue';
import FloatingMessage from './components/FloatingMessage.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    HourBlock, 
    FloatingMessage,
  },
  data() {
    return {
      err: '',
    };
  },
  computed: {
    hourlist() {
      return this.$root.getAvaliableBikes();
    },
  },
  methods: {
    getHours() {
      this.$root.requestAvaliableBikes()
        .catch(err => {
          this.err = err.message;
        });
    },
    showError(err) {
      this.err = err;
    },
    clearError() {
      this.err = '';
    },
  },
  mounted() {
    this.getHours();
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&family=Satisfy&display=swap');
:root {
  --primary-color: #f26464;
  --text-color: #2c3e50;
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

.container {
  margin-left: 1rem;
  margin-right: 1rem;
}

.flex {
  display: flex;
}

.header-title {
  font-family: 'Satisfy', cursive;
  font-size: 2.5em;
}
.hour-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media screen and (min-width: 600px) {
  .container {
    margin-left: 10rem;
    margin-right: 10rem;
  }
}

.fade-enter-active {
  animation: fade-in 0.1s;
}
.fade-leave-active {
  animation: fade-in 0.1s reverse;
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
