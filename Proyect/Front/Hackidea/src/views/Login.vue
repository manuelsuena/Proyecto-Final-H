<template>
  <div class="main">

         <!-- Se aplica el cambio de nombre-->
       <vue-headful title= "Login"
     description="Página para loggin."/>

       <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>

         
       <!--Elementos HTML  -->
    <div id="input"> 
      <h2> Iniciar sesión </h2>
     <p v-show="required"> tienes datos aun por rellenar </p>
     <label for="Email"> Email:</label>
    <input type="text" placeholder="Escribe tu email"
    v-model="email">
    <label for=" password"> Password:</label>
     <input type="password" placeholder="Escribe tu contraseña"
    v-model="contrasena">

<button @click="login()"> Entrar </button>
 </div>

 <br>
 <br>
 <FooterCustom> </FooterCustom>

  </div>
</template>

<script>
/* Importamos los componentes que queremos utilizar en esta vista */
import axios from "axios";
import MenuCustom from '@/components/MenuCustom.vue'
import FooterCustom from '@/components/FooterCustom.vue'
import Swal from "sweetalert2"

export default { 
    name: 'Login',
    components:{
           FooterCustom,
           MenuCustom,
       },
     data(){
         return {
            email: '',
            contrasena: '',
           correctData: false,
            required: false,
         }
     },
      methods: {
     // Función de logear
        login(){
             const self = this
             axios.post(('http://localhost:3009/user/login'),{
                 email: self.email,
                 contrasena: self.contrasena,
             })
             .then(function (response){
               localStorage.setItem("token", response.data.data.token);
               localStorage.setItem("role", response.data.data.role);
               localStorage.setItem("nombres", response.data.data.nombre);
               localStorage.setItem("id", response.data.data.id);
                self.$router.push("/");
              })

             .catch(function (error){
                console.log(error)
             })
            
        },
      }
}

</script>

<style scoped>

.main {
  width: 100%;
    background-repeat: no-repeat;
}
input{
    padding: 0.7rem;
    margin: 1rem;
}
button {
    padding: 0.5rem;
    border-radius: 20%;
    background: rgb(224, 236, 235);
    color: rgb(41, 21, 21);
}
h2{

   color:black;
}

#input {
    display: inline-block;
    width: 40%;
    padding: 1rem;
    border: solid black 2px;
    background:rgb(178, 208, 219);
}
</style>
