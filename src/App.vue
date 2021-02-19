<template>
  <div id="app">
    <div>
      <h1>Encomiendas</h1>
      <p>
        Seleccione un horario para solicitar a un motociclista
      </p>
    </div>
    <div v-if="hourlist" class="container hour-list">
      <HourBlock 
        v-for="(hour, key) in hourlist"
        :key="key" 
        :id="key"
        :empty="hour.avaliableItems <= 0"
        @block-action="getHours"
        @block-error="showError"/>
    </div>
    <transition name="fade">
      <FloatingMessage v-if="err" context="error" :message="err" @close="clearError"/>
    </transition>
  </div>
</template>

<script>
import HourBlock from './components/HourBlock.vue'
import FloatingMessage from './components/FloatingMessage.vue'

export default {
  name: 'App',
  components: {
    HourBlock, 
    FloatingMessage,
  },
  data() {
    return {
      hourlist: {}, 
      err: '',
    };
  },
  methods: {
    getHours() {
      fetch('http://localhost:3000/hour', {
        mode: 'cors',
        method: 'GET',
      })
        .then(res => res.json())
        .then(res => {
          this.hourlist = res;
        })
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
:root {
  --text-color: #2c3e50;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-color);
}

.container {
  margin-left: 1rem;
  margin-right: 1rem;
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
