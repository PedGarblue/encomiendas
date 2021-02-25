  <template>
    <div>
      <button class="btn" @click="open = true">
        <img src="@/assets/scooter.svg" class="scooter-icon" />
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
                :bikes="getUserBikes"
                action="occupied"
              />
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
  padding: 1rem 0;
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
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