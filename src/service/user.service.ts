import { Injectable } from '@nestjs/common';
import { User } from '../model/user';

import { Environment } from 'roit-environment';
import { ModelMapper } from "@roit/roit-model-mapper";

import axios from 'axios';

@Injectable()
export class UserService {
  users: User[];

  constructor(){
    if(Environment.currentEnv() == 'dev'){
      this.users= [
        {id: 1, nome: "Usuário Teste 1",idade: 20, github: "usuarioTeste",cep: undefined,endereco: undefined,avatarurl: undefined,login: undefined,urlperfil: undefined},
        {id: 2, nome: "Usuário Teste 2",idade: 25, github: "usuarioTeste2",cep: undefined,endereco: undefined,avatarurl: undefined,login: undefined,urlperfil: undefined},
        {id: 3, nome: "Usuário Teste 3",idade: 23, github: "usuarioTeste3",cep: undefined,endereco: undefined,avatarurl: undefined,login: undefined,urlperfil: undefined},
        {id: 4, nome: "Usuário Teste 4",idade: 20, github: "usuarioTeste4",cep: undefined,endereco: undefined,avatarurl: undefined,login: undefined,urlperfil: undefined},
        {id: 5, nome: "Usuário Teste 5",idade: 18, github: "usuarioTeste5",cep: undefined,endereco: undefined,avatarurl: undefined,login: undefined,urlperfil: undefined},
        {id: 6, nome: "Usuário Teste 6",idade: 35, github: "usuarioTeste6",cep: undefined,endereco: undefined,avatarurl: undefined,login: undefined,urlperfil: undefined},
      ];
    }
  }

  private async getInfoGitHub(user: User){
    await axios.get('https://api.github.com/search/users?q='+ user.github)
    .then(function (response) {
      const {login,avatar_url,url} = response.data.items[0];
      user.avatarurl = avatar_url;
      user.login = login;
      user.urlperfil = url;
      
      return user;
    })
    .catch(function (error) {
      return error;
    })
  }

  getAll(){
    return this.users;
  }

  getById(id: number){
    const user = this.users.find((value) => value.id == id);
    return user;
  }

  async create(user: User){
    let lastId = 0;
    let userCompleted = undefined;
  
    if(this.users.length > 0){
      lastId = this.users[this.users.length - 1].id;
    }
    user.id = lastId + 1;

    await this.getInfoGitHub(user)

    await axios.get('https://viacep.com.br/ws/'+ user.cep +'/json/')
      .then(function (response) {
        user.endereco = response.data;
        userCompleted = ModelMapper.deserialize(User,user);

      })
      .catch(function (error) {
        return error;
      })  
    this.users.push(userCompleted);

    return userCompleted;
  }

  async update(user: User){
    let userArray = this.getById(user.id);
    let userCompleted = undefined;
  
    if(userArray){
      userArray.nome = user.nome;
      userArray.idade = user.idade;     
      userArray.github = user.github;

      if(user.github){
        await axios.get('https://api.github.com/search/users?q='+ user.github)
        .then(function (response) {
          const {login,avatar_url,url} = response.data.items[0];
          userArray.avatarurl = avatar_url;
          userArray.login = login;
          userArray.urlperfil = url;
  
        })
        .catch(function (error) {
          return error;
        })
      } 

      if(user.cep){
        userArray.cep = user.cep;
        await axios.get('https://viacep.com.br/ws/'+ user.cep +'/json/')
        .then(function (response) {
          userArray.endereco = response.data;
          userCompleted = ModelMapper.deserialize(User,userArray);
        })
        .catch(function (error) {
          return error;
        })
        this.users[user.id - 1] = userCompleted;
        userArray = userCompleted;
        return userCompleted;
      }else{
        return userArray;
      }      
    }   
  }

  delete(id: number){
    const index = this.users.findIndex((value) => value.id == id);
    this.users.splice(index, 1);
  }
}
