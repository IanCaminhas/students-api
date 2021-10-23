import * as StudentsDB from "../db/students";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();
    return res.status(StatusCodes.OK).json(students);
  }

  async getId(req : Request, res: Response) {
    const id = await parseInt(req.params.id,10)
    const student = await StudentsDB.getStudent(id);
    return res.status(StatusCodes.OK).json(student);
  }



  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);
    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async update(req: Request, res: Response){
    const id = await parseInt(req.params.id,10)
    await StudentsDB.updateStudent(id, req.body)
    return res.status(StatusCodes.OK).json('ok')
  }

  async delete(req: Request, res: Response){
    const id = await parseInt(req.params.studentId,10)
    await StudentsDB.deleteStudent(id)
    return res.status(StatusCodes.OK).json('ok')
  }


}
