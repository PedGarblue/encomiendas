<template>
  <div>
    <div v-if="isOpen" class="fixed-background flex flex-center">
      <div class="container">
        <div class="card">
          <div class="card-header">
            <h2>Agregar Ciclista</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="createBike">
              <div class="form-group">
                <label for="plate">Placa</label>
                <input v-model="bike.plate" type="text" required>
              </div>
              <div class="form-buttons">
                <button type="submit" class="btn btn-primary">Agregar</button>
                <button @click="close" class="btn btn-secondary">Cerrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="btn btn-secondary" @click="open">
      Agregar bicicleta
    </div>
  </div>
</template>

<script>
import { createBike } from '../api/bike';

export default {
  name: 'CreateBike',
  data() {
    return {
      bike: {
        plate: '',
      },
      err: '',
      status: 'closed',
    };
  },
  computed: {
    isOpen() {
      return this.status === 'open';
    },
  },
  methods: {
    close() {
      this.status = 'closed';
    },
    open() {
      this.status = 'open';
    },
    createBike() {
      createBike(this.bike)
        .then(() => {
          this.$emit('created');
          this.close()
        })
        .catch(err => {
          this.err = err.message;
        });
    },
  }
}
</script>

<style scoped></style>