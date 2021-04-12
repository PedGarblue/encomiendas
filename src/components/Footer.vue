<template>
  <footer>
    <div class="copyright">
      <div class="social">
        <a href="#" class="social-link facebook"><i class="icon-facebook2"></i></a>
        <a href="#" class="social-link instagram"><i class="icon-instagram"></i></a>
        <a href="#" class="social-link github"><i class="icon-github"></i></a>
      </div>
      <div class="margin-a-l">©2021 Encomiendas</div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>

<style>
.copyright {
  display: flex;
  padding: 2rem 1rem;
  background-color: #e6e6e6;
  color: var(--text-color);
}
@media screen and (min-width: 600px) {
  .copyright {
    padding: 2rem 4rem;
  }
}
.social-link {
  padding: 0.4rem 0.5rem;
  border-radius: 0.3rem;
  margin: 0 0.25rem;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.facebook {
  background-color: #5e8daa;
  color: white;
}
.instagram {
  background-color: tomato;
  color: white;
}
.github {
  background-color: #262424;
  color: white;
}
.social-link:hover {
  box-shadow: 0rem 0rem 0.2rem #2b2828;
}
</style>
