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

test('get /hotels debe retornar status 200', async() => { 
    const res = await request(app).get('/hotels').set('Authorization',`Bearer ${token}`)
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
 });

test('POST /hotels debe crear un hotel', async() => { 
    const body = {
        "name": "The Ritz-Carlton New York, Central Park",
        "description": "Located in Midtown and framed by Central Park, the Ritz-Carlton New York Central Park is the perfect spot for a luxurious stay, featuring experiences tailored to city living. This prestigious hotel is a short walk from Fifth Avenue shopping and Rockefeller Center and one block from the 57th Street subway station for convenient access to the entire city. Guests will find the iconic Radio City Music Hall and Broadway Theater District only one mile away. Stylishly designed with a townhouse-inspired atmosphere, each guest room and suite is exquisitely furnished with luxury features and amenities. Guest rooms provide breathtaking views of either Central Park or the city skyline. Relax in the exclusive La Prairie Spa and rejuvenate with massage, facial, and sauna services, or take advantage of the hotel's state-of-the-art fitness center.",
        "price": "540",
        "address": "50 Central Park South, New York, NY 10019, United States of America",
        "lat": "40.76534500465579",
        "lon": "-73.97599920355094"
    }
    const res = await request(app).post('/hotels').send(body)
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name)
  });

test('GET /hotels/:id debe traer un hotel por id', async() => { 
    const res = await request(app).get(`/hotels/${id}`).set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200)
    expect(res.body.name).toBeDefined();
 })

test('PUT /hotels:id debe actualizar un hotel', async() => {
    const body = {
        "name": "The Ritz-Carlton New York, Central Park updated",
    }
    const res = await request(app).put(`/hotels/${id}`).send(body).set('Authorization',`Bearer ${token}`);
    expect(res.status).toBe(200);
    console.log(res.body)
    expect(res.body.name).toBe(body.name);
});

test("DELETE /hotels/:id debe eliminar un hotel",async()=>{
    const res = await request(app).delete(`/hotels/${id}`).set('Authorization',`Bearer ${token}`);;
    expect(res.status).toBe(204);
  });
