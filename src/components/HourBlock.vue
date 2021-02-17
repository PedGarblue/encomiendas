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
      bikeId: false,
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
