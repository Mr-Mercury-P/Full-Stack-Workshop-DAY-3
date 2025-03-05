import Login from './Login/Login';
import Register from './Register/Register'
import {Routes, Route} from 'react-router-dom'
import Navbar from './Navbar/Navbar';

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
