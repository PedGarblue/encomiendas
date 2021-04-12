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
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { pick } from '../utils/object.util';
import { AUTH_REGISTER } from '../store/actions/auth';
import { USER_LOAD } from '../store/actions/user';

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
    ...mapActions([AUTH_REGISTER, USER_LOAD]),
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
      await this[USER_LOAD](user)
        .then(() => {
          this.$router.push({ name: 'HourList' });
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
