const request = require('supertest');
const app = require('../server');

describe('Course Controller', () => {
  describe('GET /api/courses', () => {
    it('deve retornar todos os cursos', async () => {
      const response = await request(app).get('/api/courses').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(3); // Ajustado para 3 cursos reais
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('description');
      expect(response.body[0]).toHaveProperty('id');
    });

    it('deve retornar cursos fixos mesmo sem dados no banco', async () => {
      // Este teste verifica que a API retorna os cursos fixos do arquivo courses.Data.js
      // independentemente do estado do banco de dados
      const response = await request(app).get('/api/courses').expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(3);
      expect(response.body[0]).toHaveProperty('title', 'Introdução ao Python');
      expect(response.body[1]).toHaveProperty('title', 'Gestão de Negócios');
      expect(response.body[2]).toHaveProperty('title', 'Redes do Zero');
    });
  });

  describe('GET /api/courses/:id', () => {
    it('deve retornar um curso específico por ID', async () => {
      // Usando um ID que existe nos dados fixos
      const courseId = 1; // "Introdução ao Python"

      const response = await request(app)
        .get(`/api/courses/${courseId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', courseId);
      expect(response.body).toHaveProperty('title', 'Introdução ao Python');
      expect(response.body).toHaveProperty('description');
    });

    it('deve retornar 404 para curso não encontrado', async () => {
      const response = await request(app).get('/api/courses/99999').expect(404);

      expect(response.body).toHaveProperty('error');
    });

    it('deve retornar 400 para ID inválido', async () => {
      const response = await request(app)
        .get('/api/courses/invalid-id')
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});
