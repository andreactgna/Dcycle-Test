import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Test1 from 'pages/test1';
import Test2 from 'pages/test2';

function App() {
 return(
  <Routes>
    <Route path='/test1' element={<Test1 />} />
    <Route path='/test2' element={<Test2 />} />
    <Route
        path="*"
        element={<Navigate to={"/test1"} />} />
  </Routes>
 )
}

export default App;
