<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <AuthExample />
    <FirestoreExample />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import AuthExample from './components/AuthExample.vue';
import FirestoreExample from './components/FirestoreExample.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
    AuthExample,
    FirestoreExample,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

