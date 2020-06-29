<template>
  <div class="main">

              <!-- Se aplica el cambio de nombre-->
            <vue-headful title="Landing"
         description="Página de todas las ideas"/>

          <!-- Menú de la página  -->
      <MenuCustom> </MenuCustom>
    
      
               <!--Elementos HTML  -->
   <h2 id="titulo"> Página principal de las ideas o preguntas </h2>
   <div class="ideasp" v-for="(idea, index) in ideas" :key="idea.id">  
   <p>{{idea.id_idea}}</p>
   <h3> {{idea.titulo}}</h3>
   <p> Categoria: {{idea.categoria}}</p>
   <p> {{idea.descripcion}}</p>
   <p> Visitas: {{idea.visita}}</p>
   <p> Rating: {{idea.puntaje}}</p>
   <button @click="showIdeas(index)" > ver </button>
   

      <div class="IdeaInd" v-show="showIdeaInd">

          <div class="Usuario">
              <p> Nickname: {{user.nickname}}</p>
              <p> miembro desde: {{user.fecha_creacion}} </p>
             <button @click=" showComentar(index)"> comentar </button>
            <button @click="showVoto(index)"> votar </button>
            <button @click=" closeModal()"> atras </button>

         
        <h2> 
            {{currentIdea.titulo}}
        </h2>
        <p> Categoria: {{currentIdea.categoria}}</p>
        <p> {{currentIdea.descripcion}}</p>

         <h2> Comentarios: </h2>
        <div v-for="msg in msgs" :key="msg.id">  
        <p>{{msg.mensaje}}</p>
       </div>
        </div>
           
             <div class="rating" v-show="newRating">

             <Label for="voto"> Voto: </Label>
             <input type="number" name="voto" placeholder="nuevo voto"
             v-model="puntaje">
             <button @click="addVoto(index)"> enviar </button>
            </div>
     

             <div class="comentar" v-show="makeNewComment">

             <Label for="Mensaje"> Mensaje: </Label>
             <input type="text" name="mensaje" placeholder="nuevo mensaje"
             v-model="mensajes">
             <button @click="addMensaje(index)"> enviar </button>
            </div>

              </div>
            
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
    name: 'IdeaL',
    components:{
           FooterCustom,
           MenuCustom,
       },
    data(){
        return {
            ideas:[],
            currentIdea:[],
            msgs: [],
            user:[],
         
            newTitulo: '',
            newCategoria: '',
            newDescripcion: '',
            showIdeaInd: false,
            mensajes: '',
            makeNewComment: false,
            newRating: false,
            puntaje:'',
        }
    },

    // Funcióin validar y agregar usuarios
    methods: {
        getIdea() {
      const self = this;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/ideas')
        .then(function(response) {
          self.ideas = response.data.data;
          console.log(self.ideas[index].id_idea)
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
  
          showIdeas(index) {
     this.showIdeaInd = true,
      this.getIdeaInd(index);
      this.getComentarios(index);
      this.getUserInd(index);
       console.log(msg)
    },

      getIdeaInd(index) {
      const self = this;
       const id = self.ideas[index].id_idea;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/ideas/' + id)
        .then(function(response) {
          self.currentIdea = response.data.data;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
          getUserInd(index) {
      const self = this;
       const id = self.ideas[index].id_idea;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/useridea/' + id)
        .then(function(response) {
          self.user = response.data.data;
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
       getComentarios(index) {
      const self = this;
       const id = self.ideas[index].id_idea;
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get('http://localhost:3009/user/messages/' + id)
        .then(function(response) {
          self.msgs = response.data.data;
          console.log(msgs)
        })
        .catch(function(error) {
          console.error(error.response.data.message);
        });
    },
         showVoto(index) {


               this.newRating = true;
    }, 
   
            addVoto(index){
             var self = this
              const user = localStorage.getItem("id");
             const token = localStorage.getItem("token");
              const id = self.ideas[index].id_idea;
             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
             axios.post('http://localhost:3009/ideas/vote/' + id, {
                 puntaje: self.puntaje,
                  /* id_usuario: self.user, */
             })
             .then(function (response){
                 self.emptyFields() //vaciar campos
                 console.log(response)  
                  location.reload()
             })

             .catch(function (error){
                console.log(error)
             })

             Swal.fire({
             icon: "success",
             title: 'Mensaje creado',
             text: "Ya puedes ver el nuevo mensaje que realizaste"
              })
             },
    
        emptyFields(){
           this.newMensaje=''

        },
                 showComentar(index) {


               this.makeNewComment = true;
    }, 
   
            addMensaje(index){
             var self = this
              const user = localStorage.getItem("id");
             const token = localStorage.getItem("token");
              const id = self.ideas[index].id_idea;
             axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
             axios.post('http://localhost:3009/user/message/' + id, {
                 mensaje: self.mensajes,
                  /* id_usuario: self.user, */
             })
             .then(function (response){
                 self.emptyFields() //vaciar campos
                 console.log(response)  
                  location.reload()
             })

             .catch(function (error){
                console.log(error)
             })

             Swal.fire({
             icon: "success",
             title: 'Mensaje creado',
             text: "Ya puedes ver el nuevo mensaje que realizaste"
              })
             },
    
        emptyFields(){
           this.newMensaje=''

        },
        closeModal(){
               this.showIdeaInd = false;
        }

    },
      created(){
    this.getIdea();
}
}
</script>

<style scoped>
.main {
    margin-top: -4rem;
   
}
#titulo{
    margin: 1rem;
    padding: 1rem;
    color: black;
}
.ideasp {
     border:2px solid black ;
     width: 30%;
     padding: 1rem;
     margin: 1rem;
}
 

button{
    padding: 0.7rem;
    background: lightcyan;
    color: black;
}

</style>
