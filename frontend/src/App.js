import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import QuestionAns from './components/QuestionAns';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
function App() {
  return (
   <>
   <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard"exact element={<Dashboard />} />
          <Route path="/register"exact element={<Register />} />
          <Route path="/QansForum"exact element={<QuestionAns />} />
        </Routes>   
      </Router> 
   
   </>
  );
}

export default App;
