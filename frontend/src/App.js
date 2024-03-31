import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

//context
import AuthState from './context/auth/AuthState.js';
import ItemState from './context/project/ProjectState.js';
import StudentState from './context/student/StudentState.js';

//import pages
import Interface from './Pages/interface.js';
import Proflogin from './Pages/prof/auth/profAuth.js';
import Studentlogin from './Pages/student/auth/studentAuth.js';
import StudentHome from './Pages/student/projects/allProjects.js'

const App = () => {
  return (
    <AuthState>
        <ItemState>
            <StudentState>
                <BrowserRouter>
                    <Routes>
                        {/* starting interface page */}
                        <Route path='/' element={<Interface/>}/>

                        {/* prof login page */}
                        <Route path='/prof' element={<Proflogin/>}/>

                        {/* student login page */}
                        <Route path='/student' element={<Studentlogin/>}/>

                        {/* prof home page */}
                        <Route path='/prof/projects' element={<Proflogin/>}/>

                        {/* student home page */}
                        <Route path='/student/projects' element={<StudentHome/>}/>
                    </Routes>
                </BrowserRouter>
              </StudentState>
        </ItemState>
          
    </AuthState>
  );
}

export default App;
