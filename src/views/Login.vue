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
            <div v-if="message" class="message">
              {{ message }}
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
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { AUTH_LOGIN } from '../store/actions/auth';
import { USER_REQUEST } from '../store/actions/user';
import { pick } from '../utils/object.util';

export default {
  data() {
    return {
      user: {
        name: '',
        password: '',
      },
      message: '',
    };
  },
  methods: {
    ...mapActions([AUTH_LOGIN, USER_REQUEST]),
    async login() {
      const data = pick(this.user, ['name', 'password']);
      let user = {};
      await this[AUTH_LOGIN](data)
        .then(resp => {
          user = resp.user;
        })
        .catch(err => {
          this.message = err; 
        });
      await this[USER_REQUEST](user)
        .then(() => {
          this.$router.push({ name: 'Home' });
        })
        .catch(err => {
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