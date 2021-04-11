<template>
  <div class="hour">
    <i class="icon-bike"></i>
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
    background-color: white;
    display: flex;
    width: 90%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: var(--small) auto;
    padding: 1rem 0.5rem;
    border: 0.1rem solid;
    border-radius: 0.5rem;
  }
  .hour__id {
    font-size: 3rem;
  }
  .icon-bike {
    font-size: 4rem;
    margin-right: var(--medium);
  }
  .create-delivery {
    flex-basis: 75%;
  }
  @media screen and (min-width: 600px) {
    .hour {
      padding: 1rem;
    }
    .create-delivery {
      flex-basis: auto;
      margin-left: var(--medium);
    }
  }
</style>
