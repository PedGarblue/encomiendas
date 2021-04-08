<template>
  <div class="bg-terciary">
    <div class="margin-s-b padding-m-y bg-secondary">
      Tus pedidos
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="hasPendingDeliveries" class="deliveries">
        <delivery 
          v-for="delivery in deliveries"
          :key="delivery.id"
          :data="delivery"
          @confirm="updatePendingDeliveries"
        />
      </div>
      <h2 v-else>{{ message }}</h2>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Delivery from './Delivery';
import { USER_DELIVERIES_REQUEST } from '../store/actions/user';

const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export default {
  components: {
    Delivery,
  },
  data() {
    return {
      deliveryList: [],
      status: SUCCESS,
      err: '',
    };
  },
  computed: {
    ...mapGetters(['pendingDeliveries', 'hasPendingDeliveries']),
    deliveries() {
      return this.pendingDeliveries.map(delivery => ({
        id: delivery._id,
        bike: delivery.bike,
        hour: delivery.hour,
        products: delivery.products,
      }));
    },
    message() {
      if (this.status === LOADING) {
        return 'Cargando...';
      } else if (this.status === ERROR) {
        return this.err;
      } else {
        return '¡No has hecho ningún pedido!';
      }
    },
  },
  methods: {
    ...mapActions([USER_DELIVERIES_REQUEST]),
    updatePendingDeliveries() {
      this.status = LOADING;
      this[USER_DELIVERIES_REQUEST]()
        .then(() => {
          this.status = SUCCESS;
        })
        .catch(err => {
          this.status = ERROR;
          this.err = err.message;
        });
    },
  },
};
</script>

<style>
.deliveries {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>