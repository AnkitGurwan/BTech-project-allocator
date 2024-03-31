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
import StudentHome from './Pages/student/projects/allProjects.js';
import StudentSpecificProject from './Pages/student/projects/specificProject.js';

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
                        <Route path='/btp/prof' element={<Proflogin/>}/>

                        {/* student login page */}
                        <Route path='/btp/student' element={<Studentlogin/>}/>

                        {/* prof home page */}
                        <Route path='/btp/prof/projects' element={<Proflogin/>}/>

                        {/* student home page */}
                        <Route path='/btp/student/projects' element={<StudentHome/>}/>

                        {/* student particular project page */}
                        <Route path='/btp/student/projects/:id' element={<StudentSpecificProject/>}/>
                    </Routes>
                </BrowserRouter>
              </StudentState>
        </ItemState>
          
    </AuthState>
  );
}

export default App;
