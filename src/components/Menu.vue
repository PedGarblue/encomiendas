<template>
  <div class="menu">
    <div class="links">
      <router-link
        :to="{ name: 'HourList'}"
        class="btn btn-primary font-bold"
      >
        <i class="icon-clock margin-s-r"></i>Horarios
      </router-link>
      <router-link 
        :to="{ name: 'UserDeliveries'}"
        class="btn btn-primary font-bold"
      >
        <i class="icon-star-full margin-s-r"></i>Pedidos
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.links {
  box-shadow: 0rem 0.2rem 0.3rem 0rem #868686;
}
.btn {
  display: flex;
  align-items: center;
  text-align: left;
}
</style>