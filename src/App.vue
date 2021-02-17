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
        @block-action="getHours"/>
    </div>
    <div v-if="err">
      {{ err }}
    </div>
  </div>
</template>

<script>
import HourBlock from './components/HourBlock.vue'

export default {
  name: 'App',
  components: {
    HourBlock, 
  },
  data() {
    return {
      hourlist: {}, 
      err: '',
    };
  },
  methods: {
    getHours() {
      fetch('http://192.168.1.103:3000/hour', {
        mode: 'cors',
        method: 'GET',
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.hourlist = res;
        })
        .catch(err => {
          this.err = err;
        });
    },
  },
  mounted() {
    this.getHours();
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  margin-left: 1rem;
  margin-right: 1rem;
}

@media screen and (min-width: 600px) {
  .container {
    margin-left: 10rem;
    margin-right: 10rem;
  }
}
</style>
