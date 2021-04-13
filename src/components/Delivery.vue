<template>
  <div class="delivery frame margin-m-y margin-a-x">
    <div v-if="!isLoading">
      <div class="field">
        <span class="font-bold"><i class="icon-star-empty"></i></span>
        <span :title="this.data.id">{{ shortId }}</span>
      </div>
      <div class="field">
        <span class="font-bold"><i class="icon-clock"></i> </span>
        <span>{{ this.data.hour }}</span>
      </div>
      <div>
        <span class="font-bold">Productos: </span>
        <div class="margin-m-y">
          <span
            class="product margin-s-x"
            v-for="product in products"
            :key="product"
          >{{ product }}</span>
        </div>
      </div>
      <div class="margin-s-t" v-if="!this.static">
        <button class="btn btn-secondary" @click="confirm">¿Ya lo Recibistes?</button>
      </div>
    </div>
    <loading v-else class="margin-a-y" />
  </div> 
</template>

<script>
import { confirmDelivery } from '../api/delivery';
import Loading from './Loading.vue';

const IDLE = 'IDLE';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export default {
  components: { Loading },
  props: {
    data: {
      type: Object,
      required: true,
    },
    static: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      status: IDLE,
    };
  },
  computed: {
    isLoading() {
      return this.status === LOADING && this.static === false;
    },
    shortId() {
      return `...${this.data.id.substr(-6)}`;
    },
    products() {
      const productsEmojis = {
        apples: '🍎',
        fororo: '🍞',
        cookies: '🍪',
      };
      return this.data.products.map(product => productsEmojis[product]);
    },
  },
  methods: {
    confirm() {
      this.status = LOADING;
      confirmDelivery(this.data.id)
        .then(() => {
          this.status = SUCCESS;
          this.$emit('confirm');
        })      
        .catch(err => {
          this.status = ERROR;
          this.$emit('error', err);
        });
    },
  },
};
</script>

<style scoped>
.delivery {
  background-color: white;
  display: flex;
  flex-direction: column;
  width: max-content;
  padding: 0.5rem 0.8rem;
}

.delivery .field {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: left;
}

.product {
  padding: var(--small);
  background-color: #eeeeee;
  border: 0.1rem solid rgb(66, 62, 62);
  border-radius: 0.3rem;
}
</style>