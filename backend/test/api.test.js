const request = require('supertest');
const app = require('../server');

describe('API Tests', () => {

  let token;

  it('debe registrar un usuario nuevo', async () => {
    const res = await request(app).post('/api/auth/register').send({
      nombre: 'Sandy',
      email: 'sandy@example.com',
      password: '123456',
      perfil: 'comprador'
    });
    expect([201, 401]).toContain(res.statusCode); // 201 si es nuevo, 401 si ya existe
  });

  it('debe iniciar sesión y devolver token', async () => {
    const res = await request(app).get('/api/auth/login').send({
      email: 'sandy@example.com',
      password: '123456'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it('debe rechazar creación de producto sin token', async () => {
    const res = await request(app).post('/api/productos').send({
      nombre: 'Producto 1',
      descripcion: 'Muy bueno',
      imagenes: ['img1.jpg'],
      precio: 100,
      condicion: 'nuevo',
      ubicacion: 'Chile'
    });
    expect(res.statusCode).toBe(401);
  });

  it('debe obtener lista de productos', async () => {
    const res = await request(app).get('/api/productos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
