<template>
  <div>

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="Mis Comentarios"
         description="Página de los comentarios del usuario."/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
      
               <!--Elementos HTML  -->
   <h2> Mis comentarios  </h2>
   <div v-for="(coment, index) in coments" :key="coment.id">  
   <p>{{coment.mensaje}}</p>
   <p> {{coment.id_comentario}}</p>
  
    <button @click="deleteMensajes(index)"> Eliminar </button>
        </div>
     

 <FooterCustom> </FooterCustom>
  </div>
</template>

<script>
/* Importamos los componentes que queremos utilizar en esta vista */
import MenuCustom from '@/components/MenuCustom.vue'
import FooterCustom from '@/components/FooterCustom.vue'
import axios from 'axios'
import IdeasCustom from '@/components/IdeasCustom.vue'
import Swal from "sweetalert2";

export default {
    name: 'Miscomentarios',
    components:{
           FooterCustom,
           MenuCustom,
       },
    data(){
        return {
           coments:[],

        }
    },

    // Funcióin validar y agregar usuarios
    methods: {
        getMensajes() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/user/message/'+ data)
        .then(function(response) {
          self.coments = response.data.data;
          console.log(self.coments[0].id_comentario)
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
        deleteMensajes(index) {
       const self = this;
      const data = self.coments[index].id_comentario;
      axios.delete('http://localhost:3009/user/message/' + data)
          
        .then(function(response) {
            location.reload()
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        })
         Swal.fire({
        icon: "success",
        title: 'Mensaje eliminado',
        text: "Haz borrado el mensaje",
         })
        },
    },
      created(){
    this.getMensajes();
}
}
</script>

<style scoped>


button{
    padding: 0.7rem;
    background: lightcyan;
    color: black;
}
h2{
    color: blue;
}
</style>

