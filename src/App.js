
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
 import DataTableStudent from './DataTableStudent';


// import Student from './Student';

// import Student from './Student';
// import StudentAddForm from './StudentAddForm';
// import StudentAddForm from './StudentAddForm';


function App() {
  return (
    <div className="App">

      
     {/* <h2 className='text-info' >Hello</h2> */}

     <BrowserRouter>
      <Routes> 
        {/* <Route path="/" element={<Student />}> */}
        <Route path="/" element={<DataTableStudent />}>
        
        {/* <Route path="student" element={<Student />} /> */}
        
         
          {/* <Route path="studentaddform" element={<StudentAddForm />} /> */}
          
        </Route>
      </Routes>
    </BrowserRouter>
     {/* <Student></Student>
     <StudentAddForm></StudentAddForm> */}
    </div>
  );
}

export default App;
