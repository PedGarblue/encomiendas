<template>
  <div class="hour">
    <span>Horario: {{ id }} </span>
    <div class="botones">
      <button @click="appendItem">Pedir</button>
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
  methods: {
    appendItem() {
      this.$emit('appendItem');
    },
  },
}
</script>

<style>
.hour {
  padding: 1rem;
}
</style>
