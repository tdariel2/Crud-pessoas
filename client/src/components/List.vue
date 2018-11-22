<template>
  <div class="hello">
    <div>
      <img class= "floate-left" src='../irancho.png'>
   </div>
    <div id="todo-list-example" class="container">
      <div class="row">
        <div class="col-md-8 mx-auto" id="color">
          <h1 class="text-center" v-if="this.isEdit == false">Inserir dados</h1>
          <h1 class="text-center" v-else>Alterar dados</h1>
          <form v-on:submit.prevent="addNewPessoa">
            <label class = "float-left" for="nomeinput">Nome</label>
            <input  type='text' v-model="pessoa.nome" id="nomeinput" class="form-control" placeholder="Adicionar Nome">
            <label class = "float-left" for="emailinput">Email</label>
            <input  type='email' v-model="pessoa.email" id="emailinput" class="form-control" placeholder="Adicionar email">
            <label class = "float-left" for="endereco">Endereço</label>
            <input  type='text' v-model="pessoa.endereco" class="form-control" placeholder="Adicionar endereço">
            <div class="radio">
              <label for="sexoF" class= "float-left"><input  type='radio' v-model="pessoa.sexo" id="sexoF" value="F" name="sexo" class="optradio" >Feminino</label>
              <label for="sexoM" class= "float-left"><input  type='radio' v-model="pessoa.sexo" id="sexoM" value="M" name="sexo"  class="optradio" >Masculion</label>
              <label for="situacao" class="float-right "><h5><input id="situacao"  type = "checkbox" class="form-check-input" v-model="pessoa.ativo">Ativo</h5></label>
            </div>
            <button v-if="this.isEdit == false" class="btn btn-primary btn-block mt-3">Adicionar</button>
            <button v-else v-on:click="updatePessoa()" class="btn btn-primary btn-block mt-3">Alterar</button>
          </form>
        </div>
        <div class="mx-auto">
          <br>
          <h1>Lista de pessoas</h1>
          <table class="table" border="1">
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Endereço</th>
              <th>sexo</th>
              <th>situação</th>
              <th></th>
            </tr>
            <tr v-for="pessoa in pessoas"
            v-bind:key="pessoa.id"
            v-bind:title="pessoa.nome">
              <td class="text-left">{{pessoa.nome}}</td>
              <td class="text-left">{{pessoa.email}}</td>
              <td class="text-left">{{pessoa.endereco}}</td>
              <td class="text-left">{{pessoa.sexo}}</td>
              <td class="text-left">{{pessoa.ativo}}</td>
              <td class="text-right">
                <button class="btn btn-info" v-on:click="editPessoa(pessoa)">Editar</button>
                <button class="btn btn-danger" type="submit" v-on:click="deletePessoa(pessoa)">Deletar</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios'
export default {
  data () {
    return {
      pessoas: [],
      pessoa: {
        id: '',
        nome: '',
        email: '',
        endereco: '',
        sexo: '',
        ativo: ''
      },
      isEdit: false
    }
  },
  mounted () {
    this.getPessoas()
  },
  methods: {
    getPessoas () {
      axios.get('http://localhost:3000/api/dados').then(
        result => {
          console.log(result.data)
          this.pessoas = result.data
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewPessoa () {
      axios.post('http://localhost:3000/api/dados', this.pessoa)
        .then((res) => {
          this.getPessoas()
        }).catch((err) => {
          console.log(err)
        })
    },
    editPessoa (pessoa) {
      this.pessoa = pessoa
      console.log(this.pessoa)
      this.isEdit = true
    },
    updatePessoa () {
      axios.put(`http://localhost:3000/api/dados/${this.pessoa.id}`,
        this.pessoa)
        .then((res) => {
          this.pessoa = ''
          this.isEdit = false
          this.getPessoas()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deletePessoa (pessoa) {
      axios.delete(`http://localhost:3000/api/dados/${pessoa.id}`)
        .then((res) => {
          this.getPessoas()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
