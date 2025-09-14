import './App.css';
import Navbar from './components/Navbar.jsx';
import Manager from './components/Manager.jsx';
import Credential from './components/Credential.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Manager/>} />
            <Route path="/credentials" element={<Credential/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;