<template>
  <div id="app">
    <div>
      <h1>Encomiendas</h1>
      <p>
        Seleccione un horario para solicitar a un motociclista
      </p>
    </div>
    <div v-if="hourlist" class="container">
      <HourBlock 
        v-for="(hour, key) in hourlist"
        :key="key" 
        :id="key"
        :empty="hour.avaliableItems <= 0"
        @block-action="getHours"
        @block-error="showError"/>
    </div>
    <FloatingMessage v-if="err" context="error" :message="err" @close="clearError"/>
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

.floating-error {
  position: fixed;
}

@media screen and (min-width: 600px) {
  .container {
    margin-left: 10rem;
    margin-right: 10rem;
  }
}
</style>
