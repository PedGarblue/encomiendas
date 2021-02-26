  <template>
    <div>
      <button class="btn" @click="open = true">
        <img src="@/assets/scooter.svg" class="scooter-icon" />
        <transition name="fade">
          <span v-if="userHasItems" class="circle"></span>
        </transition>
      </button>
      <transition name="slide">
        <div v-if="open" class="menu">
          <div class="menu-contents">
            <div class="bike-list">
              <span class="close-btn" @click="open = false">x</span>
              <div class="bike-list-header">
                <span>Mis pedidos</span>
              </div>
              <bike-list
                v-if="getUserBikes.length > 0"
                :bikes="getUserBikes"
                action="occupied"
              />
              <div v-else class="bike-list-empty">
                Ahora mismo no tienes ningún pedido reservado.
              </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BikeList from './BikeList.vue';

export default {
  name: 'MyBikes',
  components: {
    BikeList,
  },
  data() {
    return { 
      open: false,
    };
  },
  computed: {
    ...mapGetters(['getUserBikes']),
    userHasItems() {
      return this.getUserBikes.length > 0;
    },
  },
}
</script>

<style scoped>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  background-color: transparent;
  border: none;
  border-radius: 0;
  cursor: pointer;
  transition: ease 0.177s all;
}

.btn:hover {
  background-color: #ec8484;
}

.scooter-icon {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  margin-bottom: 0.6rem;
}

.circle {
  width: 0.8rem;
  height: 0.8rem;
  background-color: rgb(123, 236, 123);
  border-radius: 50%;
  position: relative;
  left: -1.5rem;
  top: 0.6rem;
  margin-left: -0.8rem;
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: #00000017;
}

.menu-contents {
  width: 20rem;
  height: 100%;
  background-color: whitesmoke;
  margin-left: auto;
}

.bike-list-header {
  padding: 1.23rem 0;
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
}

.bike-list-empty {
  margin-top: 1rem;
}

.close-btn {
  position: relative;
  top: 1rem;
  float: left;
  padding: 0 0.5rem;
  color: white;
  cursor: pointer;
  font-weight: bold;
}

.slide-enter-active {
  animation: slide 0.1s;
}
.slide-leave-active {
  animation: slide 0.1s reverse;
}

@keyframes slide {
  from {
    padding-left: 20rem;
  }

  to {
    padding-left: 0;
  }
}
</style>