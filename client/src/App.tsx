import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import register from './pages/auth/forms/register';
import login from './pages/auth/forms/login';
import home from './pages/home';
import Sidebar from './components/Sidebar';
import './index.css';
import userProfile from './pages/userProfile';
import savedPosts from './pages/savedPosts';
import editProfile from './pages/editProfile';

function App() {
   return (
      <Router>
         <Sidebar>
            <Routes>
               <Route path="/" Component={home} />
               <Route path="/profile" Component={userProfile} />
               <Route path="/profile/:id" Component={editProfile} />
               <Route path="/saved-posts" Component={savedPosts} />
               <Route path="/search" Component={home} />
               <Route path="auth/login" Component={login} />
               <Route path="auth/register" Component={register} />
            </Routes>
         </Sidebar>
      </Router>
   );
}

export default App;
