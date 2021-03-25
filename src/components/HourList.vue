<template>
  <section class="container">
    <div v-if="hasHoursAvaliable" class="list">
      <hour v-for="hour in list" :key="hour.id" :data="hour" />
    </div>
    <div v-else>
      {{ err }}
    </div>
  </section>
</template>

<script>
import { getAvaliableDeliveryHours } from '../api/hour';
import Hour from '../components/Hour.vue';

export default {
  components: {
    Hour,
  },
  data() {
    return {
      list: [],
      err: '',
    };
  },
  computed: {
    hasHoursAvaliable() {
      return this.list.length > 0;
    },
  },
  methods: {
    async getAvaliableHours() {
      getAvaliableDeliveryHours()
        .then(resp => {
          this.list = resp;
        })
        .catch(err => {
          this.err = err.message;
        });
    },
  },
  mounted() {
    this.getAvaliableHours();
  },
};
</script>

<style>

</style>