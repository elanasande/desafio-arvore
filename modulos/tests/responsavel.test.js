const request = require('supertest');
const http = require('http');

let server;
  
beforeAll(async done => {
     server = await http.createServer((req, res) => {
    res.write('ok');
    res.end();
    });
    server.listen(done);
});
beforeEach(async () => {
    await request(server)
        .post('/responsavel')
        .send({
            nome: 'ELANA1',
            nascimento: '08-09-2000',
            email: 'elana@gmail.com',
            senha: '123456',
            nivelPermissao: true
        });
});
afterEach(async () => {
    await request(server)
        .delete('/responsavel/ELANA1');
});



  describe('Test GET /responsavel/:nome', () => {
    it('It should respond the GET method sending back an object', (done) =>{
        request(server)
            .get('/responsavel/ELANA1')
            .send()
            .expect(200)
            .then((res) => {
                expect(res.body).toBeTruthy();
                done();
            });
    });

    it('It should not respond the GET method with a nonexistent name', (done) =>{
        request(server)
            .get('/responsavel/Monogatari')
            .send()
            .expect(404, done);
    });
});


describe('Test POST /responsavel', () => {
    it('It should respond the POST method with a nonexistent book', (done) =>{
        request(sever)
            .post('/responsavel')
            .send({
                nome: 'ELANA2',
                nascimento: '08-09-2000',
                email: 'elana@gmail.com',
                senha: '123456',
                nivelPermissao: true
            }).expect(201, done);
    });


    afterAll(async () => {
       await request(app)
           .delete('/responsavel/ELANA2');
    });
});

afterAll(done => {
    server.close(done);
});