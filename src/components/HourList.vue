<template>
  <div>
    <section id="avaliable-items" class="container">
      <bike-list 
        v-if="getAvaliableHours.length > 0"
        :bikes="getAvaliableHours"
        action="avaliable"
        @list-error="showError"
      />
      <div v-else class="avaliable-items-empty">
        No hay motociclistas disponibles, intente más tarde.
      </div>
    </section>
  </div>
</template>