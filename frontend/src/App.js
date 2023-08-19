import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Navbar from './comopent/NavBar/Navbar';
import  Login from './pages/login/login';
import Signup from './pages/signup/signup';
import ReqAuth from './comopent/ReqAuth';
import StudentRegistration from './pages/StudentRegistration/StudentRegistration';
import ShowStudent from './pages/showStudent/ShowStudent';
function App() {

  return (
<>
<BrowserRouter>
<Navbar />
       <Routes>

        <Route  path='/' element={ <ReqAuth>
          <StudentRegistration/>
          
        </ReqAuth>  } />
        <Route  path='/auth' element={<Signup/>} />
        <Route  path='/login' element={<Login/>} />
        <Route  path='/student-registration' element={ <ReqAuth>
          <StudentRegistration/>
          
        </ReqAuth>  } />
        <Route  path='/view-students' element={ <ReqAuth>
          <ShowStudent/>
          
        </ReqAuth>  } />
       </Routes>
  
    </BrowserRouter>
</>
  );
}

export default App;
