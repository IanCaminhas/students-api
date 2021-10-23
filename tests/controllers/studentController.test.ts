import { StatusCodes } from 'http-status-codes';
import { Student } from './../../src/entities/Student';
import app from "..";
import supertest from "supertest";

jest.mock("../../src/db/students", () => {
  const originalModule = jest.requireActual("../../src/db/students");

  const students: Student[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999"),
    },




  ];


  const newStudent = {
    id: 2,
    name: "John Doe 2",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999").toISOString(),
  };



  const updateStudent = [
    {
      id:1,
      name: "Ian",
      email: "caminhasian@gmail.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1994").toISOString(),

    }

  ];

  return {
    __esModule: true, 
    ...originalModule,
    getStudents: () => Promise.resolve(students),
    addStudent:(student:Student) => Promise.resolve(newStudent) ,
    updateStudent: (id: number ,student: Student)=> Promise.resolve(StatusCodes.OK),
    deleteStudent: (id: number) => Promise.resolve("ok"),
    getStudent: (id:number) => Promise.resolve(StatusCodes.OK),
  }


})

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
      email: "john.doe@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });


  it("should delete student", async () => {

    await supertest(app)
      .delete(`/students/${1}`)
      .expect(200)
      .then((res)=>expect(res.body).toBe("ok"));
  
      await supertest(app)
      .get(`/students/${1}`)
      .then((res)=>expect(res.status).toBe(200));
  
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
  expect(res.body[0]).toMatchObject([{
    id:1,
    name: "Ian",
    email: "caminhasian@gmail.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1994"),

  },
 
]
    
  )

);


});


});


    
  