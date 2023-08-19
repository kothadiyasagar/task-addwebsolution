const  express  = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const {getStudent, updateStudent ,createStudent,deleteStudent} = require("../controllers/studentRegistration")

router.get('/',auth, getStudent);
router.post('/', auth,  createStudent);
router.patch('/:id', auth, updateStudent);
router.delete('/:id', auth, deleteStudent);


module.exports = router;