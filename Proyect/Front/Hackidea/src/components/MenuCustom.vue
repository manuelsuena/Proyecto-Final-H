<template>
   <!-- Se crean los elementos del HTML -->
  <div >
    <div id="nav">

     <img src="../assets/logof.png" alt="logo">
    
      <router-link :to="{name:'Login'}"> Login</router-link>
<!--         <router-link :to="{ name: 'Register'}">Registro</router-link> 
       <router-link :to="{name:'Profile'}"> Profile </router-link> 
      <router-link :to="{name:'Landing'}"> Portada</router-link> 
      <router-link :to="{name:'Idea'}"> Idea</router-link>  -->
       <router-link :to="{name:'About'}"> About</router-link> 
        <button @click="logOutUser()"> Logout</button>
       </div>
         
         
  </div>
</template>

<!-- Importamos y Exportamos las variables y su tipo que queremos que aparezcan en la vista  -->
<script>
import { logOut } from "../api/utils.js"
import vueHeadful from 'vue-headful';
export default {
  name: 'MenuCustom',

  methods: {
    logOutUser() {
      logOut();
      this.$router.push("/login");
    },
  },
};
</script>

<!--Estilo -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

img {
  width: 200px;
  position: relative;
  margin-left: -35rem;
  margin-right: 20rem;
}

#nav a {
  font-weight: bold;
  color: black;
  margin: 1rem;
  font-size: 1.25rem;

}

#nav a.router-link-exact-active {
  color: red;
  margin: 1rem;
}
</style>

