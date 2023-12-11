import './App.css';

//import React Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
//import Pages
import Main from './pages/Main';
import CreateUser from './pages/CreateUser';
import UpdateUser from './pages/UpdateUser';
import Users from './pages/Users';

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;