<template>
  <div>
    <transition name="slide">
      <div v-if="isOpen" class="fixed-background flex flex-center">
        <div class="card width-100">
          <div class="card-header">
            <h2>Solicitar Pedido: {{ hour }}</h2>
            <div>{{ err }}</div>
          </div>
          <div class="card-body">
            <transition name="fade" mode="out-in">
              <div v-if="selectProducts" key="selectProducts">
                <div class="flex flex-center">
                  <div 
                    v-for="product in avaliableProducts"
                    :key="product.name"
                    class="btn margin-s-x"
                    :class="{ 
                      'btn-secondary': !isProductSelected(product.name),
                      'btn-primary': isProductSelected(product.name)
                    }"
                    @click="toggleProduct(product.name)"
                  >
                    <div>{{ product.icon }}</div>
                    <div>{{ product.name }}</div>
                  </div>
                </div>
              </div>
              <div v-else-if="deliveryRequest" key="deliveryRequest">
                <h3>Solicitando pedido...</h3>
              </div>
              <div v-else-if="deliveryComplete" key="deliveryComplete">
                <h3>¡Pedido Creado!</h3>
                <delivery :data="delivery" :static="true" />
              </div>
            </transition>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary margin-s-x" @click="nextStage">
              Continuar
            </button>
            <button @click="close" class="btn btn-secondary margin-s-x">Cancelar</button>
          </div>
        </div>
      </div>
    </transition>
    <button 
      @click="open"
      class="btn btn-primary margin-s-y margin-m-l"
      :class="{ disabled }"
    >
      {{ !disabled ? 'Solicitar' : 'No disponible' }}
    </button>
  </div>
</template>

<script>
import { pick } from '../utils/object.util';
import { createDelivery } from '../api/delivery';
import Delivery from './Delivery';
import { USER_DELIVERIES_REQUEST } from '../store/actions/user';
import { mapActions } from 'vuex';

const STAGE_CLOSED = 'STAGE_CLOSED';
const STAGE_SELECT_PRODUCTS = 'STAGE_SELECT_PRODUCTS';
const STAGE_REQUEST = 'STAGE_REQUEST';
const STAGE_COMPLETE = 'STAGE_COMPLETE';

export default {
  components: {
    Delivery,
  },
  props: {
    hour: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    },
    avaliableProducts: {
      type: Array,
      default() {
        return [
          {
            name: 'apples',
            icon: '🍎',
          },
          {
            name: 'fororo',
            icon: '🍞',
          },
          {
            name: 'cookies',
            icon: '🍪',
          },
        ];
      },
    },
  },
  data() {
    return {
      delivery: {
        id: '',
        bike: '',
        hour: '',
        products: [],
      },
      stage: STAGE_CLOSED,
      err: '',
    };
  },
  computed: {
    isOpen() {
      return this.stage !== STAGE_CLOSED;
    },
    selectProducts() {
      return this.stage === STAGE_SELECT_PRODUCTS;
    },
    deliveryRequest() {
      return this.stage === STAGE_REQUEST;
    },
    deliveryComplete() {
      return this.stage === STAGE_COMPLETE;
    },
    hasProductsSelected() {
      return this.delivery.products.length > 0;
    },
    isProductSelected() {
      return product => this.delivery.products.includes(product);
    }
  },
  methods: {
    ...mapActions([USER_DELIVERIES_REQUEST]),
    open() {
      if(!this.disabled) {
        this.delivery.hour = this.hour;
        this.stage = STAGE_SELECT_PRODUCTS;
      }
    },
    close() {
      this.delivery.id = ''
      this.delivery.bike = ''
      this.delivery.hour = ''
      this.delivery.products = [];
      this.stage = STAGE_CLOSED;
    },
    async createDelivery() {
      const body = pick(this.delivery, ['products', 'hour']);
      return createDelivery(body);
    },
    toggleProduct(item) {
      if(!this.delivery.products.includes(item)) this.delivery.products.push(item);
      else this.delivery.products = this.delivery.products.filter(product => product !== item);
    },
    nextStage(payload = {}) {
      const stageOrders = {
        [STAGE_SELECT_PRODUCTS]: () => {
          if(!this.hasProductsSelected)
            return this.err = 'No has seleccionado ningún producto';
          this.stage = STAGE_REQUEST;
          this.createDelivery()
            .then(resp => {
              this.nextStage(resp);
            })
            .catch(() => {
              this.close();
            });
        },
        [STAGE_REQUEST]: ({ _id, bike, hour, products }) => {
          this.delivery.id = _id;
          this.delivery.bike = bike;
          this.delivery.hour = hour;
          this.delivery.products = products;
          this.stage = STAGE_COMPLETE;
          this[USER_DELIVERIES_REQUEST]();
        },
        [STAGE_COMPLETE]: () => {
          this.$emit('created');
          this.close();
        },
      };
      stageOrders[this.stage](payload);
    }
  },
};
</script>

<style>
.product {
  padding: var(--small);
  background-color: #eeeeee;
  border: 0.1rem solid rgb(66, 62, 62);
  border-radius: 0.3rem;
}
</style>