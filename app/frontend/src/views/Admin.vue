<template>
  <v-container>
    <BaseSecure>
      <h1 class="mt-6 text-center">Admin</h1>
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </BaseSecure>
  </v-container>
</template>

<script>
export default {
  name: 'Admin'
};
</script>

<style scoped>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
