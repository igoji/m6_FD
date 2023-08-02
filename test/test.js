const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../index.js");
chai.use(chaiHttp);

describe('Pruebas GET', () => {
    it('Status 200 al hacer GET a la ruta /anime', (done) => {
      chai.request(server)
          .get('/anime')
          .end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
          });
    });
    it('Status 200 al hacer GET a la ruta /anime con un id valido', (done) => {
        chai.request(server)
            .get('/anime?id=1')
            .end((err, res) => {
              chai.expect(res).to.have.status(200);
              done();
            });
      });
          it('Status 404 al hacer GET a la ruta /anime con un id invalido', (done) => {
      chai.request(server)
          .get('/anime?id=666')
          .end((err, res) => {
            chai.expect(res).to.have.status(404);
            done();
          });
    });
    it('Status 200 al hacer GET a la ruta /anime con un nombre valido', (done) => {
        chai.request(server)
            .get('/anime?nombre=akira')
            .end((err, res) => {
              chai.expect(res).to.have.status(200);
              done();
            });
      });
      it('Status 404 al hacer GET a la ruta /anime con un nombre invalido', (done) => {
        chai.request(server)
            .get('/anime?nombre=iurjkr')
            .end((err, res) => {
              chai.expect(res).to.have.status(404);
              done();
            });
      });
  });


  describe('Pruebas POST', () => {
    it('Status 200 al hacer POST valido a la ruta /anime', (done) => {
      chai.request(server)
          .post('/anime')
          .send({
            nombre: "Hyouka",
            genero: "Misterio",
            año: "2012",
            autor: "Honobu Yonezawa"
          })
          .end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
          });
    });
    it('Status 400 al hacer POST sin body a la ruta /anime', (done) => {
        chai.request(server)
            .post('/anime')
            .end((err, res) => {
              chai.expect(res).to.have.status(400);
              done();
            });
      });
    it('Status 400 al hacer POST con body vacío a la ruta /anime', (done) => {
    chai.request(server)
        .post('/anime')
        .send({})
        .end((err, res) => {
            chai.expect(res).to.have.status(400);
            done();
        });
    });
})

describe('Pruebas PUT', () => {
    it('Status 200 al hacer PUT a la ruta /anime con un id valido', (done) => {
      chai.request(server)
          .put('/anime?id=2')
          .send({
            nombre: "Dragon Ball Z",
          })
          .end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
          });
    });
    it('Status 404 al hacer PUT a la ruta /anime con un id invalido', (done) => {
        chai.request(server)
            .put('/anime?id=666')
            .send({
              nombre: "Dragon Ball Z",
            })
            .end((err, res) => {
              chai.expect(res).to.have.status(404);
              done();
            });
      });
})

describe('Pruebas DELETE', () => {
    it('Status 200 al hacer DELETE a la ruta /anime con un id valido', (done) => {
      chai.request(server)
          .delete('/anime?id=4')
          .end((err, res) => {
            chai.expect(res).to.have.status(200);
            done();
          });
    });
    it('Status 404 al hacer DELETE a la ruta /anime con un id invalido', (done) => {
        chai.request(server)
            .delete('/anime?id=666')
            .end((err, res) => {
              chai.expect(res).to.have.status(404);
              done();
            });
      });
})

