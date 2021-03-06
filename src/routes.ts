import { celebrate, Joi } from "celebrate";
import express, { response } from "express";
import { StudentsController } from "./controllers/studentController";
import { StudentSchema,UpdateStudentSchema } from "./entities/Student";


const routes = express.Router();

const studentsController = new StudentsController();

routes.get("/ping", (_, res) => res.json("pong"));

routes.get("/students", studentsController.get);
routes.post(
  "/students",
  celebrate({ body: Joi.object().keys(StudentSchema) }),
  studentsController.create
);

routes.get(
  "/students/:id",
  celebrate({
    params: Joi.object().keys({id: Joi.number().required()}),
  }),

  studentsController.getId

  );


routes.put(
  "/students/:id",
  celebrate({ 
    params: Joi.object().keys({id: Joi.number().required()}),
    body: Joi.object().keys(UpdateStudentSchema),
  }),
  
  studentsController.update
  
);

routes.delete(
  "/students/:studentId",
  celebrate({
    params: Joi.object().keys({studentId: Joi.number().required()})
  }),
  
    studentsController.delete
);

export default routes;
