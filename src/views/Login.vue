<template>
  <div id="login">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h2>Ingresar</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="username">Usuario</label>
              <input 
                v-model="user.name"
                name="username"
                type="text"
                required
                autocomplete="username"
              >
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input
                v-model="user.password"
                name="password"
                type="password"
                required
                autocomplete="current-password"
              >
            </div>
            <div class="form-buttons">
              <button type="submit" class="btn btn-primary btn-100-width margin-s-b">Ingresar</button>
              <router-link to="register">
                <button type="submit" class="btn btn-secondary btn-100-width margin-s-b">Registrase</button>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
    <transition name="fade">
      <loading v-if="isLoading" :fixed="true" />
      <floating-message 
        v-else-if="hasError"
        context="error"
        :message="message"
        @close="cleanStatus"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FloatingMessage from '../components/FloatingMessage.vue';
import Loading from '../components/Loading.vue';
import { AUTH_LOGIN } from '../store/actions/auth';
import { USER_LOAD } from '../store/actions/user';
import { pick } from '../utils/object.util';

const IDLE = 'IDLE';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export default {
  components: { Loading, FloatingMessage },
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
      status: IDLE,
      message: '',
    };
  },
  computed: {
    isLoading() {
      return this.status === LOADING;
    }, 
    hasError() {
      return this.status === ERROR;
    }, 
  },
  methods: {
    ...mapActions([AUTH_LOGIN, USER_LOAD]),
    cleanStatus() {
      this.status = IDLE;
    },
    async login() {
      const data = pick(this.user, ['name', 'password']);
      this.status = LOADING;
      await this[AUTH_LOGIN](data)
        .then(resp => {
          return this[USER_LOAD](resp.user);
        })
        .then(() => {
          this.status = SUCCESS;
          this.$router.push({ name: 'HourList' });
        })
        .catch(err => {
          this.status = ERROR;
          this.message = err; 
        });
    }
  },
}
</script>

<style>
.message {
  color: var(--primary-color);
  margin: 1.3rem;
  border: 0.1rem solid;
  padding: 0.3rem;
  border-radius: 0.3rem;
}
</style>