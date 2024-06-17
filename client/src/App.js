import './css/index.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';

const PrivateRoute = ({ children }) => {
  const userLoggedIn = Boolean(localStorage.getItem('user'));

  return userLoggedIn ? children : <Navigate to="/" />;
};

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute> <Home /> </PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
