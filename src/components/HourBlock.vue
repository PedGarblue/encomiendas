<template>
  <div class="hour">
    <span>Horario: {{ id }} </span>
    <div class="botones">
      <button @click="bikeAction" :class="{ green: isAvaliable, red: !isAvaliable }">
        {{ isAvaliable ? 'Solicitar' : 'Completar' }}
       </button>
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
  },
  data() {
    return {
      bike: this.$root.getUserBike(this.id),
    };
  },
  computed: {
    isAvaliable() {
      return !this.bike;
    },
  },
  methods: {
    bikeAction() {
      if (this.isAvaliable) this.requireBike();
      else this.freeBike();
    },
    requireBike() {
      this.$root.addUserBike(this.id)
        .then(json => {
          this.bike = json;
        })
        .catch(err => this.$emit('block-error', err))
        .finally(() => this.$emit('block-action'));
    },
    freeBike() {
      this.$root.freeUserBike(this.id)
        .then(() => {
          this.bike = false;
        })
        .catch(err => this.$emit('block-error', err))
        .finally(() => this.$emit('block-action'));
    },
  },
}
</script>

<style scoped>
.hour {
  padding: 1rem;
  border: 1px solid;
  margin: 0.7rem 0.3rem;
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
  transition: 0.1s ease-in all;
}
button:hover {
  opacity: 0.8;
}
button.red {
  background-color: #f26464;
  color: white;
}
button.green {
  background-color: #5caa51;
  color: white;
}
</style>
