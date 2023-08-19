
var fs = require('fs');
const path = require('path');
const dataDirectory = path.join(__dirname, './data');
const filePath = path.join(dataDirectory, 'student.json');

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([{}]), 'utf-8');
}
const readDataFromFile = () => {
    try {
      const data = fs.readFileSync(filePath, 'utf-8')
  
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  };
  

 const getStudent = async (req, res) => {

    try {
        const data =  await readDataFromFile()
        res.json({ data});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


 const createStudent = async (req, res) => {
    const student = req.body;
    const data = fs.readFileSync(filePath, 'utf-8')
    const studetCreate  = [...data ,student]
 await fs.writeFileSync(filePath, JSON.stringify(studetCreate, null, 2), 'utf-8');
    try {
       const data =  await readDataFromFile()   
        res.status(201).json(student);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

 const updateStudent = async (req, res) => {
    const { id } = req.params;
    const data =  await readDataFromFile()
    // const { title, message, creator, selectedFile, tags } = req.body;
    const filterData  =  await data?.some((elem)=> elem.id === id)
     if (!filterData) return res.status(404).send(`No Student with id: ${id}`);

    const updatedStudent =  data.map((student) => (student.id ===  id ? req.body : student))
   await fs.writeFileSync(filePath, JSON.stringify(updatedStudent, null, 2), 'utf-8');

    res.json(updatedStudent);
}

 const deleteStudent = async (req, res) => {
    const { id } = req.params;
    const data =  await readDataFromFile()
    const filterData  =  await data?.some((elem)=> elem.id === id)
    if (!filterData) return res.status(404).send(`No Student with id: ${id}`);
     const deleteStudent = data.filter((student) => student.id !==  id)

     await fs.writeFileSync(filePath, JSON.stringify(deleteStudent, null, 2), 'utf-8');

    res.json({ message: "Post deleted successfully." });
}


module.exports = {getStudent, updateStudent ,createStudent,deleteStudent}