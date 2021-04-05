<template>
  <section>
    <div class="margin-s-b padding-m-y bg-secondary">
      Horarios
    </div>
    <transition name="fade" mode="out-in">
      <div v-if="hasHoursAvaliable" class="list">
        <transition-group name="slide">
          <hour v-for="hour in list" :key="hour.id" :data="hour" @action="getAvaliableHours" />
        </transition-group>
      </div>
      <h2 v-else>{{ message }}</h2>
    </transition>
  </section>
</template>

<script>
import { getAvaliableDeliveryHours } from '../api/hour';
import Hour from '../components/Hour.vue';

const IDLE = 'IDLE';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export default {
  components: {
    Hour,
  },
  data() {
    return {
      list: [],
      status: IDLE,
      err: '',
    };
  },
  computed: {
    hasHoursAvaliable() {
      return this.list.length > 0;
    },
    message() {
      switch (this.status) {
        case LOADING: 
          return 'Espere...';
        case ERROR:
          return this.err;
        default:
          return 'Disculpe, no hay pedidos disponibles, intente más tarde';
      }
    },
    isLoading() {
      return this.status === LOADING;
    },
  },
  methods: {
    async getAvaliableHours() {
      this.status = LOADING;
      getAvaliableDeliveryHours()
        .then(resp => {
          this.status = SUCCESS;
          this.list = resp;
        })
        .catch(err => {
          this.status = ERROR;
          this.err = err.message;
        });
    },
  },
  mounted() {
    this.getAvaliableHours();
  },
};
</script>

<style scoped>
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity ease 0.5s;
}
</style>