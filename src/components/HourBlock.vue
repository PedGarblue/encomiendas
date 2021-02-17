<template>
  <div class="hour">
    <span>Horario: {{ id }} </span>
    <div class="botones">
      <button v-if="bikeId" @click="freeBike">Liberar</button>
      <div v-else-if="empty">
        No hay Motociclistas disponibles.
      </div>
      <button v-else @click="requireBike">Pedir</button>
    </div>
  </div>
</template>

<script>
import { saveBike, deleteBike, getBike } from '../utils/bike.storage.js';

export default {
  name: 'HourBlock',
  props: {
    id: {
      type: String,
      required: true,
    },
    empty: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      bikeId: getBike(this.id),
    };
  },
  methods: {
    requireBike() {
      const data = {
        hourId: this.id,
        action: 'APPEND',
      };
      fetch('http://localhost:3000/hour', { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(resp => resp.json())
        .then(json => {
          this.bikeId = json.id;
          saveBike(this.id, json);
        })
        .then(() => this.$emit('block-action'));
    },
    freeBike() {
      const data = {
        hourId: this.id,
        itemId: this.bikeId,
        action: 'ADD',
      };
      fetch('http://localhost:3000/hour', { 
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          deleteBike(this.id);
          this.bikeId = false;
        })
        .then(() => this.$emit('block-action'));
    },
  },
}
</script>

<style>
.hour {
  padding: 1rem;
}
</style>
