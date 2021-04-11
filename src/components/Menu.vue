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
        <span v-if="hasPendingDeliveries" class="pending">{{ pendingDeliveriesCount }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Menu',
  computed: {
    ...mapGetters(['hasPendingDeliveries', 'pendingDeliveries']),
    pendingDeliveriesCount() {
      return this.pendingDeliveries.length;
    },
  },
}
</script>

<style scoped>
.links {
  box-shadow: 0rem 0.2rem 0.3rem 0rem #868686;
}
.btn {
  display: flex;
  align-items: center;
  text-align: center;
}
.pending {
  background-color: white;
  color: var(--primary-color);
  padding: 0 0.3rem;
  border-radius: 50%;
  margin-left: 0.3rem;
}
@media screen and (min-width: 600px) {
  .btn {
    text-align: left;
  }
}
</style>
