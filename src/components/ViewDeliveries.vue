<template>
  <div class="bg-terciary">
    <div class="margin-s-b padding-m-y bg-secondary">
      Tus pedidos
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="hasDeliveriesAvaliable" class="deliveries">
        <delivery 
          v-for="delivery in deliveries"
          :key="delivery.id"
          :data="delivery"
          @confirm="requestMyDeliveries"
        />
      </div>
      <h2 v-else>{{ message }}</h2>
    </transition>
  </div>
</template>

<script>
import Delivery from './Delivery';
import { getUserDeliveries } from '../api/delivery';

const IDLE = 'IDLE';
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
      status: IDLE,
      err: '',
    };
  },
  computed: {
    deliveries() {
      return this.deliveryList.map(delivery => ({
        id: delivery._id,
        bike: delivery.bike,
        hour: delivery.hour,
        products: delivery.products,
      }));
    },
    message() {
      switch (this.status) {
      case LOADING: 
        return 'Espere...';
      case ERROR:
        return this.err;
      default:
        return '¡No has hecho ningún pedido!';
      }
    },
    hasDeliveriesAvaliable() {
      return this.status === SUCCESS && this.deliveries.length > 0;
    },
  },
  methods: {
    async requestMyDeliveries() {
      this.status = LOADING;
      return getUserDeliveries()
        .then(resp => {
          this.status = SUCCESS;
          this.deliveryList = resp;
        })
        .catch(err => {
          this.status = ERROR;
          this.err = err;
        });
    },
  },
  mounted() {
    this.requestMyDeliveries();
  },
};
</script>

<style>
.deliveries {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>