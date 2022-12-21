import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login/Login';
import UserDetail from './pages/UserDetail/UserDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
