<template>
  <div class="hour" :class="{ 'hour-disabled': empty }">
    <span>Horario: {{ id }} </span>
    <div class="botones">
      <button v-if="bikeId" @click="freeBike" class="button-green">Completar</button>
      <div v-else-if="empty">
        No hay Motociclistas disponibles.
      </div>
      <button v-else @click="requireBike" class="button-red">Solicitar</button>
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
      fetch('http://192.168.1.103:3000/hour', { 
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
      fetch('http://192.168.1.103:3000/hour', { 
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
  border: 1px solid;
  margin: 0.7rem 0;
  border-radius: 0.3rem;
  background-color: #f9f9f9;
}
.hour-disabled {
 background-color: #fdb2b2;
}
button {
  border: none;
  padding: 0.4rem 1.6rem;
  border-radius: 0.3rem;
}
.button-red {
  background-color: #f26464;
  color: white;
}

.button-green {
  background-color: #5caa51;
  color: white;
}
</style>
