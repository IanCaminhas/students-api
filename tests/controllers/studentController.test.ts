import app from "..";
import supertest from "supertest";

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ])
      );
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });

  it("should update student", async () => {
    const updateStudent = {
      name: "Ian",
      email: "caminhasian@gmail.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1994").toISOString(),
    };

  await supertest(app)
    .put(`/students/${1}`)
    .send(updateStudent)
    .expect(200)
    .then((res)=>expect(res.body).toBe("ok"));
  
await supertest(app)
.get("/students")
.expect(200)
.then((res) =>
  expect(res.body[0]).toMatchObject({
    id:1,
    name: "Ian",
    email: "caminhasian@gmail.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1994").toISOString(),

  })

);


});

it("should delete student", async () => {

  await supertest(app)
    .delete(`/students/${1}`)
    .expect(200)
    .then((res)=>expect(res.body).toBe("ok"));

});


});


    
  