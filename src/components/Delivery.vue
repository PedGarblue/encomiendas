<template>
  <div class="frame margin-m-y">
    <div>
      <span class="font-bold">#: </span>
      <span>{{ this.data.id }}</span>
    </div>
    <div>
      <span class="font-bold">ID Bicicleta: </span>
      <span>{{ this.data.bike }}</span>
    </div>
    <div>
      <span class="font-bold">Hora: </span>
      <span>{{ this.data.hour }}</span>
    </div>
    <div>
      <span class="font-bold">Productos: </span>
      <span>{{ this.data.products }}</span>
    </div>
    <div>
      <button class="btn btn-secondary" @click="confirm">Confirmar</button>
    </div>
  </div> 
</template>

<script>
import { confirmDelivery } from '../api/delivery';

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  methods: {
    confirm() {
      confirmDelivery(this.data.id)
        .then(() => {
          this.$emit('confirm');
        })      
        .catch(err => {
          this.$emit('error', err);
        });
    }
  },
};
</script>

<style>

</style>