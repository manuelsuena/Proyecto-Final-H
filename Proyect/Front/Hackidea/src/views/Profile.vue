<template>
  <div>

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="Profile"
         description="Página perfil usuario."/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
               <!--Elementos HTML  -->
   <h2> Perfil de: {{usuario.nombre}} </h2>
   <p> Información del usuario</p>
   <p> Nombre: {{usuario.nombre}}</p>
   <p> Apellidos: {{usuario.apellidos}}</p>
   <p> Nickname: {{usuario.nickname}}</p>
   <p> Email: {{usuario.email}}</p>
   <button @click="showEditUser()"> modificar</button>

        <div class="editData" v-show="showEdit">
      <p>Modifica tus datos</p>
      <label for="name">Nombre:</label>
      <input type="text" v-model="newNombre" placeholder="nombre" />
      <label for="name">Apellidos:</label>
      <input type="text" v-model="newApellidos" placeholder="apellidos" />
      <label for="name">Nickname:</label>
      <input type="text" v-model="newNickname" placeholder="nickname" />
      <br />
      <button @click="updateUser()">Update</button>
   
      <br />
      </div>
      <div v-show="showIdea">
           <h2> Ideas de: {{usuario.nombre}} </h2>

   <h3>  {{idea.titulo}}</h3>
   <p> Categoria: {{idea.categoria}}</p>
   <p>  {{idea.description}}</p>
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
    name: 'Profile',
    components:{
           FooterCustom,
           MenuCustom,
       },
    data(){
        return {
            usuario:{},
            idea:{},
         
            showEdit: false,
            newNombre: '',
            newApellidos: '',
            newNickname: '',
            showIdea: false,
        }
    },

    // Funcióin validar y agregar usuarios
    methods: {
        getUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/user/'+ data)
        .then(function(response) {
          self.usuario = response.data.data;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
          showIdeas(index) {
      this.showIdea = true;
    },

        showEditUser(index) {
      this.showEdit = true;
      this.newNombre = this.usuario.nombre;
      this.newApellidos = this.usuario.apellidos;
      this.newNickname = this.usuario.nickname;
    },
        updateUser() {
      const self = this;
      const data = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .put('http://localhost:3009/user/' + data, {
          nombre: self.newNombre,
          apellidos: self.newApellidos,
          nickname: self.newNickname,
        })
        .then(function(response) {
             location.reload()
             self.showEdit = false;
        })
          .catch(function (error){
                console.alert(error, 'No se pudo actualizar')
             })
              Swal.fire({
             icon: "success",
             title: 'Usuario modificado',
             text: "Ya puedes ver las modificaciones de tu perfil"
              })
        },
    },
      created(){
    this.getUser();
}
}
</script>

<style scoped>


button{
    padding: 0.7rem;
    background: rgb(224, 255, 251);
    color: black;
}
h2{
    color: blue;
}
</style>

