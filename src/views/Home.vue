<template>
  <div class="home">
    <h1>Bienvenido</h1>
    <hour-list />
  </div>
</template>

<script>
import HourList from '../components/HourList.vue';

export default {
  name: 'Home',
  components: {
    HourList,
  },
}
</script>
