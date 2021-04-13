<template>
  <div class="bg-terciary">
    <div class="margin-s-b padding-m-y bg-secondary">
      Tus pedidos
    </div>
    <transition name="fade" mode="out-in">
      <transition-group name="slide" mode="out-in" v-if="hasDeliveries" class="deliveries">
        <delivery 
          v-for="delivery in deliveries"
          :key="delivery.id"
          :data="delivery"
          @confirm="updatePendingDeliveries"
        />
      </transition-group>
      <div v-else-if="isLoading" class="flex">
        <loading class="margin-a-x"/>
      </div>
      <h2 v-else>{{ message }}</h2>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Delivery from './Delivery';
import { USER_DELIVERIES_REQUEST } from '../store/actions/user';
import Loading from './Loading.vue';

const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export default {
  components: {
    Delivery,
    Loading,
  },
  data(){
    return {
      deliveryList: [],
      status: SUCCESS, 
      err: '',
    };
  },
  computed: {
    ...mapGetters(['pendingDeliveries', 'hasPendingDeliveries']),
    isLoading() {
      return this.status === LOADING;
    },
    hasDeliveries() {
      return this.hasPendingDeliveries && this.status === SUCCESS;
    },
    deliveries() {
      return this.pendingDeliveries.map(delivery => ({
        id: delivery._id,
        bike: delivery.bike,
        hour: delivery.hour,
        products: delivery.products,
      }));
    },
    message() {
      switch (this.status) {
      case ERROR:
        return 'Ups, ha sucedido un error al obtener tus pedidos.'; 
      default:
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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
