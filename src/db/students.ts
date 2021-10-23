import { getConnection } from 'typeorm';
import { Student } from '../entities/Student';

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
async function addStudent(student: Student) {
  const newStudent = new Student(student)

 const connection = await getConnection().getRepository(Student)
 await  connection.save(newStudent)
 return newStudent
 
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () =>getConnection().getRepository(Student).find()

const updateStudent = async (id: number ,student: Student)=>{
  
  
  await getConnection()
    .createQueryBuilder()
    .update(Student)
    .set(student)
    .where("id = :id", { id: id })
    .execute();
  
};

const deleteStudent = async (id: number)=> {
  
  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(Student)
    .where("id = :id", { id: id })
    .execute();

}

const getStudent = async (id:number) =>{

 return await getConnection().getRepository(Student).findOne({ where:
    { "id": id }
})


}



export { addStudent, getStudents,updateStudent,deleteStudent,getStudent};
