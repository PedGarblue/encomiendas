<template>
  <div>
    <transition name="slide">
      <div v-if="isOpen" class="fixed-background flex">
        <div class="bg-terciary width-25 margin-a-l">
          <div class="bg-primary padding-m-y">
            <span class="btn btn-secondary close-btn" @click="close">
              X
            </span>
            <span>Mis pedidos</span>
          </div>
          <div class="deliveries margin-s-m">
            <delivery 
              v-for="delivery in deliveries"
              :key="delivery.id"
              :data="delivery"
              @confirm="requestMyDeliveries"
            />
          </div>
        </div>
      </div>
    </transition>
    <div class="btn btn-secondary" @click="open">
      Mis Pedidos
    </div>
  </div>
</template>

<script>
import Delivery from './Delivery';
import { getUserDeliveries } from '../api/delivery';

const WINDOW_CLOSED = 'WINDOW_CLOSED';
const WINDOW_OPEN = 'WINDOW_OPEN';

export default {
  components: {
    Delivery,
  },
  data() {
    return {
      deliveryList: [],
      status: WINDOW_CLOSED,
      err: '',
    };
  },
  computed: {
    isOpen() {
      return this.status === WINDOW_OPEN;
    },
    deliveries() {
      return this.deliveryList.map(delivery => ({
        id: delivery._id,
        bike: delivery.bike,
        hour: delivery.hour,
        products: delivery.products,
      }));
    },
  },
  methods: {
    open() {
      this.status = WINDOW_OPEN;
    },
    close() {
      this.status = WINDOW_CLOSED;
    },
    async requestMyDeliveries() {
      return getUserDeliveries()
        .then(resp => {
          this.deliveryList = resp;
        })
        .catch(err => {
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
.close-btn {
  float: left;
  position: relative;
  top: -1rem;
}
.deliveries {
  overflow: auto;
  height: 85vh;
}
</style>