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
              <input v-model="user.name" name="username" type="text" required>
            </div>
            <div class="form-group">
              <label for="password">Contraseña</label>
              <input v-model="user.password" name="password" type="password" required>
            </div>
            <div class="form-group">
              <label for="password-repeat">Repita su contraseña</label>
              <input v-model="user.repeatpass" name="password-repeat" type="password" required>
            </div>
            <div class="form-buttons">
              <button type="submit" class="btn btn-primary">Registrarse</button>
              <router-link to="login">
                ¿Ya tienes una cuenta?
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
import { pick } from '../utils/object.util';
import { AUTH_REGISTER } from '../store/actions/auth';
import { USER_REQUEST } from '../store/actions/user';

export default {
  data() {
    return {
      user: {
        name: '',
        password: '',
        repeatpass: '',
      },
      message: '',
    };
  },
  methods: {
    ...mapActions([AUTH_REGISTER, USER_REQUEST]),
    async register() {
      let user;
      if(this.user.password !== this.user.repeatpass) {
        this.message = 'Las contraseñas no coinciden';
        return;
      }
      const data = pick(this.user, ['name', 'password']);
      await this[AUTH_REGISTER](data)
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

</style>