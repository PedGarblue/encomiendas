<template>
<div class="hour-list">
  <hour-block 
    v-for="bike in bikes"
    :key="bike.id" 
    :id="bike.id"
    :status="isOccupiedBike(bike.id) ? 'occupied' : 'avaliable'"
    @request-bike="requireBike(bike.id)"
    @return-bike="freeBike(bike.id)"
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
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['getUserBikes']),
  },
  methods: {
    ...mapActions(['requestUserBike', 'freeUserBike']),
    isOccupiedBike(hourid) {
      return !!this.getUserBikes.find(bike => bike.id === hourid);
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