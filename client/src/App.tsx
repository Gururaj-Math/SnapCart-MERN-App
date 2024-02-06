import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import register from './pages/auth/forms/register';
import login from './pages/auth/forms/login';

function App() {
 

  return (
    <>
     <Router>
        <Routes>
          <Route path="auth/login" Component={login}></Route>
          <Route path="auth/register" Component={register}></Route>
        </Routes>
     </Router>
    </>
  )
}

export default App
