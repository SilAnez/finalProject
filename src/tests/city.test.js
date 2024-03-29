const request = require('supertest');
const app = require('../app');
let id;
let token;

beforeAll(async () =>{
    const res = await request(app).post('/users/login').send({
            email: "test@mail.com",
            password: "test123",
    });
    token = res.body.token;
})

test('get /cities debe retornar status 200', async() => { 
    const res = await request(app).get('/cities').set('Authorization',`Bearer ${token}`)
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

test('POST /cities debe crear una ciudad', async() => { 
    const body = {
        "name":"Sucre",
        "country":"Bolivia",
        "countryId":"BO",
    }
    const res = await request(app).post('/cities').send(body)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
  });

test('GET /cities/:id debe traer una ciudad por id', async() => { 
    const res = await request(app).get(`/cities/${id}`).set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200)
    expect(res.body.name).toBeDefined();
 })

test('PUT /cities:id debe actualizar una ciudad', async() => {
    const body = {
        "name":"Sucre Updated",
    }
    const res = await request(app).put(`/cities/${id}`).send(body).set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    console.log(res.body)
    expect(res.body.name).toBe(body.name);
});

test("DELETE /cities/:id debe eliminar una ciudad",async()=>{
    const res = await request(app).delete(`/cities/${id}`).set('Authorization',`Bearer ${token}`);;
    expect(res.status).toBe(204);
  });

