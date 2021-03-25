<template>
  <div class="manage">
    <section class="bike-management">
      <div>
        <h2>Administración de bicicletas</h2>
      </div>
      <div class="container flex frame">
        <create-bike @created="loadBikes"/>
      </div> 
      <div v-if="bikes" class="container frame margin-m-t">
        <div v-for="bike in bikes" :key="bike.id" class="margin-s-x">
          <span class="font-normal">{{ bike.plate }}</span>
        </div>
      </div>
      <div v-else>No hay bicicletas en servicio</div>
    </section>
  </div>
</template>

<script>
import { getBikes } from '../api/bike';
import CreateBike from '../components/CreateBike.vue';

export default {
  components: {
    CreateBike,
  },
  data() {
    return {
      bikes: [],
      err: '',
    }
  },
  methods: {
    loadBikes() {
      getBikes()
        .then(resp => {
          this.bikes = resp;
        })
        .catch(err => {
          this.err = err.message;
        })
    },
  },
  mounted(){
    this.loadBikes();
  }
}
</script>

<style>

</style>