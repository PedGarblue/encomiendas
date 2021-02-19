<template>
  <div class="floating-message">
    <div class="box" :class="context">
      <div class="box-content">{{ message }}</div>
      <button @click="close">Cerrar</button>
    </div>
  </div>
</template>

<script>
const contexts = ['error', 'info'];
export default {
  name: 'FloatingMessage',
  props: {
    context: {
      type: String,
      default: 'info',
      validator: function(value) {
        return contexts.includes(value);
      },
    },
    message: {
      type: String,
      required: true,
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
}
</script>

<style scoped>
.floating-message {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000017;
}

.box {
  background-color: #fff;
  padding: 1rem 5rem;
  border: 0.15rem solid var(--text-color);
  border-radius: 0.3rem;
}
.box.error {
  border-color: var(--text-color);
}
.box.error {
  border-color: #ff7f7f;
}

.box-content {
  margin: 3rem 0;
}

button {
  width: 100%;
  border: none;
  border-radius: 0.3rem;
  transition: 0.2s ease-in;
  cursor: pointer;
}
button:hover {
  opacity: 0.7;
}
.box.error button {
  background-color: #ff7f7f;
  color: white;
}
.box.info button {
  background-color: var(--text-color);
  color: white;
}
</style>
