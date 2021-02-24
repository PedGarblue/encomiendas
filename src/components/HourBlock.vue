<template>
  <div class="hour">
    <span>Horario: {{ id }} </span>
    <div class="botones">
      <button @click="bikeAction" :class="{ green: isAvaliable, red: !isAvaliable }">
        {{ buttonStatus }}
       </button>
    </div>
  </div>
</template>

<script>
const validStatus = ['avaliable', 'occupied', 'empty'];

const actions = {
  avaliable: 'request-bike',
  occupied: 'return-bike',
};

const messages = {
  avaliable: 'Solicitar',
  occupied: 'Devolver',
  empty: 'No disponible',
};

export default {
  name: 'HourBlock',
  props: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      validator(value) {
        return validStatus.includes(value);
      },
    }
  },
  computed: {
    isAvaliable() {
      return this.status === 'avaliable';
    },
    buttonStatus() {
      return messages[this.status];
    },
  },
  methods: {
    bikeAction() {
      if(this.status !== 'empty') this.$emit(actions[this.status]);
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
