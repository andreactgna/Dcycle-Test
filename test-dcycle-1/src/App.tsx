import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Test1 from 'pages/test1';
import Test2 from 'pages/test2';
import Layout from 'layout';

function App() {
 return(
  <Routes>
    <Route element={<Layout />}>
      <Route path='/test-1' element={<Test1 />} />
      <Route path='/test-2' element={<Test2 />} />
      <Route
          path="*"
          element={<Navigate to={"/test-1"} />} />
    </Route>
  </Routes>
 )
}

export default App;
