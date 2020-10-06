import { JsonProperty } from "@roit/roit-model-mapper";

export class Endereco {
  logradouro: string = undefined;
  complemento: string = undefined;
  bairro: string = undefined;
  localidade: string = undefined;
  uf: string = undefined;
}

export class GitHubUser{
  login: string = undefined;
  avatarurl: string = undefined;
  urlperfil: string = undefined;
}

export class User extends GitHubUser{
  id: number = undefined;
  nome: string = undefined;
  idade: number = undefined;
  github: string = undefined;
  cep: number = undefined;
  @JsonProperty({ clazz: Endereco })
  endereco: Endereco = undefined;
}
