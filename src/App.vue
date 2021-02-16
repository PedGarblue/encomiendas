<template>
  <div id="app">
    <HourBlock v-for="(hour, key) in hourlist" :key="key" :id="key" @appendItem="updateHour(key,'APPEND')"/>
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
    };
  },
  methods: {
    getHours() {
      fetch('http://localhost:3000/hour')
        .then(res => res.json())
        .then(res => {
          console.log(res);
          this.hourlist = res;
        });
    },
    updateHour(id, action) {
      const data = {
        hourId: id,
        action,
      };
      fetch('http://localhost:3000/hour', { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => this.getHours());
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
  margin-top: 60px;
}
</style>
