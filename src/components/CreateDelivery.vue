<template>
  <div>
    <div v-if="isOpen" class="fixed-background">
      <div class="card width-100">
        <div class="card-header">
          <h2>Solicitar Pedido: {{ hour }}</h2>
          <div>{{ err }}</div>
        </div>
        <div class="card-body">
          <div v-if="selectProducts">
            <div class="flex flex-center">
              <div 
                v-for="product in avaliableProducts"
                :key="product"
                class="btn margin-s-y"
                :class="{ 
                  'btn-secondary': !isProductSelected(product),
                  'btn-primary': isProductSelected(product)
                }"
                @click="toggleProduct(product)"
              >
                {{ product }}
              </div>
            </div>
          </div>
          <div v-else-if="deliveryRequest">
            <h3>Solicitando pedido...</h3>
          </div>
          <div v-else-if="deliveryComplete">
            <h3>¡Pedido Creado!</h3>
            <div>
              <div>
                <span class="font-bold">#: </span>
                <span>{{ this.delivery.id }}</span>
              </div>
              <div>
                <span class="font-bold">ID Bicicleta: </span>
                <span>{{ this.delivery.bike }}</span>
              </div>
              <div>
                <span class="font-bold">Hora: </span>
                <span>{{ this.delivery.hour }}</span>
              </div>
              <div>
                <span class="font-bold">Productos: </span>
                <span>{{ this.delivery.products }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary" @click="nextStage">
            Continuar
          </button>
          <button @click="close" class="btn btn-secondary">Cancelar</button>
        </div>
      </div>
    </div>
    <button 
      @click="open"
      class="btn btn-primary margin-s-x margin-m-l"
      :class="{ disabled }"
    >
      {{ !disabled ? 'Solicitar' : 'No disponible' }}
    </button>
  </div>
</template>

<script>
import { pick } from '../utils/object.util';
import { createDelivery } from '../api/delivery';

const STAGE_CLOSED = 'STAGE_CLOSED';
const STAGE_SELECT_PRODUCTS = 'STAGE_SELECT_PRODUCTS';
const STAGE_REQUEST = 'STAGE_REQUEST';
const STAGE_COMPLETE = 'STAGE_COMPLETE';

export default {
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
        return ['apples', 'cookies', 'fororo'];
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
        },
        [STAGE_COMPLETE]: () => {
          this.close();
        },
      };
      stageOrders[this.stage](payload);
    }
  },
};
</script>

<style></style>