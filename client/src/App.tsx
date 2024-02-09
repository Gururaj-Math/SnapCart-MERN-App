import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import register from './pages/auth/forms/register';
import login from './pages/auth/forms/login';
import home from './pages/home';
import './index.css';
import userProfile from './pages/userProfile';
import savedPosts from './pages/savedPosts';
import AuthLayout from './pages/auth/authLayout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route Component={AuthLayout}>
          <Route path="auth/login" Component={login} />
          <Route path="auth/register" Component={register} />
        </Route>
        <Route Component={PrivateRoute}>
          <Route path="/" Component={home} />
          <Route path="/profile" Component={userProfile} />
          <Route path="/saved-posts" Component={savedPosts} />
          <Route path="/search" Component={home} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
