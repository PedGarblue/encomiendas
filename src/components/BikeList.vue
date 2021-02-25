<template>
<div class="hour-list">
  <transition-group name="list">
    <hour-block 
      v-for="bike in bikes"
      :key="bike.id" 
      :id="bike.id"
      :status="action"
      @request-bike="requireBike(bike.id)"
      @return-bike="freeBike(bike.id)"
    />
  </transition-group>
</div>
</template>

<script>
import { mapActions } from 'vuex';
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
    action: {
      type: String,
      required: true,
      validator() {
        return ['occupied', 'avaliable'];
      },
    }
  },
  methods: {
    ...mapActions(['requestUserBike', 'freeUserBike']),
    requireBike(hourid) {
      return this.requestUserBike(hourid)
        .catch(err => this.$emit('list-error', err))
        .finally(() => this.$emit('list-action'));
    },
    freeBike(hourid) {
      return this.freeUserBike(hourid)
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

.list-move {
  transition: all 0.5s;
}
.list-enter {
  opacity: 0;
  transform: translateX(10rem);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-10rem);
}
.list-leave-active, .list-enter-active {
  transition: all 0.5s;
}
.list-leave-active {
  position: absolute;
}
</style>