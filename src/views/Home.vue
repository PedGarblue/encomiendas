<template>
  <div class="home margin-m-t">
    <div class="container grid">
      <Menu />
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import Menu from '../components/Menu.vue';

export default {
  name: 'Home',
  components: {
    Menu,
  },
}
</script>

<style scoped>
.grid {
  background-color: var(--complementary-background);
  display: grid;
  grid-template-columns: 1fr 2fr;
  min-height: calc(100vh - 11rem);
  box-shadow: 0rem 0rem 0.4rem -0.2rem;;
}
</style>