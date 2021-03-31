<template>
  <div class="hour">
    <span class="hour__id">{{ data.id }}</span>
    <create-delivery 
      :hour="data.id"
      :disabled="!isAvaliable"
      @created="onAction"
    />
  </div>
</template>

<script>
import CreateDelivery from './CreateDelivery';

export default {
  components: {
    CreateDelivery,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAvaliable() {
      return this.data.avaliable
    },
  },
  methods: {
    onAction() {
      this.$emit('action');
    }
  },
};
</script>

<style scoped>
  .hour {
    display: flex;
    margin: var(--small) auto;
    width: max-content;
    padding: 1rem;
    border: 0.1rem solid;
    border-radius: 0.5rem;
  }
  .hour__id {
    font-size: 3rem;
  }
</style>