const bcrypt  = require("bcryptjs");
const jwt  = require("jsonwebtoken");
var fs = require('fs');
const path = require('path');
const {v4 : uuidv4} = require('uuid')
const secret = 'test';
const dataDirectory = path.join(__dirname, './data');
const filePath = path.join(dataDirectory, 'login.json');

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



 const signin = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password ) return  res.status(400).json({ message: "missing some input field" });
 try {
  let dataofUser = await readDataFromFile()
    const oldUser = await dataofUser?.some( (user)=> user.email === email )

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
const filterData  = dataofUser?.find((elem)=>{
  return elem.email === email
})
    const isPasswordCorrect = await bcrypt.compare(password, filterData.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: filterData.email, id: filterData.id }, secret, { expiresIn: "1h" });

    res.status(200).json({ result: filterData, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

 const signup = async (req, res) => {
  const { email, password, name } = req.body;

 if(!email || !password  || !name ) return  res.status(400).json({ message: "missing some input field" });
  try {
    let dataofUser = await readDataFromFile()
   
    const oldUser = await dataofUser?.some( (user)=> user.email === email );

    if (oldUser) return res.status(400).json({ message: "User already exists" });

   const hashedPassword = await bcrypt.hash(password, 12);
   const userId = uuidv4()
   const data = { email, password: hashedPassword, name ,id:userId }

  const dataUser = [...dataofUser ,data]

   await   fs.writeFileSync(filePath, JSON.stringify(dataUser, null, 2), 'utf-8');
   const expiresIn = 5 * 60
   const token = jwt.sign( { email:email, id: userId }, secret, { expiresIn:expiresIn} );

    res.status(201).json({ result:data, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};

module.exports = {signin ,signup }




