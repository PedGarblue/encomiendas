<template>
  <div id="login">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h2>Registrarse</h2>
        </div>
        <div class="card-body">
          <form @submit.prevent="register">
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
                autocomplete="new-password"
                minlength="8"
              >
            </div>
            <div class="form-group">
              <label for="password-repeat">Repita su contraseña</label>
              <input
                v-model="user.repeatpass"
                name="password-repeat"
                type="password"
                required
                autocomplete="new-password"
                minlength="8"
              >
            </div>
            <div class="form-buttons">
              <button type="submit" class="btn btn-primary width-100">Registrarse</button>
              <div class="margin-m-t">
                <router-link to="login">
                  ¿Ya tienes una cuenta?
                </router-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <transition name="fade">
      <loading v-if="isLoading" :fixed="true"/>
      <floating-message 
        v-if="hasError"
        context="error"
        :message="message"
        @close="cleanStatus"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Loading from '../components/Loading.vue';
import { pick } from '../utils/object.util';
import { AUTH_REGISTER } from '../store/actions/auth';
import { USER_LOAD } from '../store/actions/user';
import FloatingMessage from '../components/FloatingMessage.vue';

const IDLE = 'IDLE';
const LOADING = 'LOADING';
const SUCCESS = 'SUCCESS';
const ERROR = 'ERROR';

export default {
  components: {
    Loading,
    FloatingMessage,
  },
  data() {
    return {
      user: {
        name: '',
        password: '',
        repeatpass: '',
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
    }
  },
  methods: {
    ...mapActions([AUTH_REGISTER, USER_LOAD]),
    cleanStatus() {
      return this.status = IDLE;
    },
    async register() {
      this.status = LOADING;
      if(this.user.password !== this.user.repeatpass) {
        this.message = 'Las contraseñas no coinciden';
        return;
      }
      const data = pick(this.user, ['name', 'password']);
      await this[AUTH_REGISTER](data)
        .then(resp => {
          return this[USER_LOAD](resp.user);
        })
        .then(() => {
          this.status = SUCCESS;
          this.$router.push({ name: 'HourList' });
        })
        .catch(err => {
          this.message = err; 
          this.status = ERROR;
        });
    }
  },
}
</script>

<style>

</style>