<template>
  <nav>
    <a href="/" class="flex brand">
      <img src="https://img.icons8.com/cotton/64/000000/scooter--v4.png"/>
      <span>Encomiendas</span>
    </a>
    <div class="flex items">
      <MyBikes />
    </div>
  </nav>
</template>

<script>
import MyBikes from './MyBikes.vue';

export default {
  name: 'Navbar',
  components: {
    MyBikes,
  },
}
</script>

<style>
nav {
  display: flex;
  background-color: var(--primary-color);
}

.brand {
  font-family: 'Satisfy', cursive;
  font-size: 2em;
  color: white;
  margin: 0.2em 2rem;
}

.brand img {
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.6rem;
}

.items {
  margin-left: auto;
}

.item {
  height: 100%;
}
</style>