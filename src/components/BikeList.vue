<template>
<div class="hour-list">
  <hour-block 
    v-for="(bike, key) in bikes"
    :key="key" 
    :id="key"
    :status="isOccupiedBike(key) ? 'occupied' : 'avaliable'"
    @request-bike="requireBike(key)"
    @return-bike="freeBike(key)"
  />
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import HourBlock from './HourBlock';

export default {
  name: 'BikeList',
  components: {
    HourBlock
  },
  props: {
    bikes: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getUserBikes']),
  },
  methods: {
    ...mapActions(['requestUserBike', 'freeUserBike']),
    isOccupiedBike(hourid) {
      return !!this.getUserBikes[hourid];
    },
    requireBike(hourid) {
      this.requestUserBike(hourid)
        .then(() => this.isAvaliable = false)
        .catch(err => this.$emit('list-error', err))
        .finally(() => this.$emit('list-action'));
    },
    freeBike(hourid) {
      this.freeUserBike(hourid)
        .then(() => this.isAvaliable = true)
        .catch(err => this.$emit('list-error', err))
        .finally(() => this.$emit('list-action'));
    },
  },
}
</script>

<style>
.hour-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>