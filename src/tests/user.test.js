const request = require('supertest');
const app = require('../app');

let id;
let token;

test('POST /users debe crear un usuario', async () => { 
    const body ={
        firstName: 'Claudio',
        lastName: 'Cuellar',
        email: 'claudio@mail.com',
        password: 'hola123',
        gender: 'MALE',
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    console.log(res.body)
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();
  });


test('POST /users/login debe retornar un usuario y un token ', async() => {
    const body ={
        "email":"claudio@mail.com",
        "password":"hola123"
    };
    const res = await request(app).post('/users/login').send(body).set('Authorization',`Bearer ${token}`);;
    token = res.body.token;    
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email);
});

test('GET /users debe traer todos los usuarios', async () => { 
    const res = await request(app)
    .get('/users')
    .set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });



test('/POST /users/login con credenciales invalidas debe enviar un error', async () => { 
    const body = {
        email:'incorrecto@mail.com',
        password:'hola123'
    }
    const res = await request(app).post('/users/login').send(body).set('Authorization',`Bearer ${token}`);;
    expect(res.status).toBe(401);
 })


test('PUT /users/:id debe actualizar un usuario', async () => { 
        const body = {
            firstName: 'Claudio Francisco'
        }
        const res = await request(app).put(`/users/${id}`).send(body).set('Authorization',`Bearer ${token}`);;
        expect(res.status).toBe(200);
        expect(res.body.firstName).toBe(body.firstName);
   });

test('DELETE /users/:id debe eliminar un usuario', async () => { 
        const res = await request(app).delete(`/users/${id}`).set('Authorization',`Bearer ${token}`);
        expect(res.status).toBe(204);
   });

