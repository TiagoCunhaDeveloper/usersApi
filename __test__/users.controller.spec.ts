import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from '../src/users.module';

describe('UserController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET - Listar Todos', async () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200);
  });

  it('GET - Listar por id', async () => {
    return request(app.getHttpServer())
      .get('/users/1').expect(200);
  });

  it('POST - Criar', async () => {
    return await request(app.getHttpServer())
      .post('/users').send({nome: "Nome Teste",idade: 20,github:"TiagoCunhaDeveloper",cep:84025530})
      .expect(201);
  });

  it('PUT - Atualizar', async () => {
    return await request(app.getHttpServer())
      .put('/users/1').send({nome: "Nome Teste 2",idade: 25,github:"TiagoCunhaDeveloper",cep:84025530}).expect(200);
  });

  it('DELETE - Deletar', async () => {
    return request(app.getHttpServer())
    .get('/users/1').expect(200);
  });
});
