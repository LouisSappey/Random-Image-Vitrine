import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Homepage';
import RandomImage from './components/RandomImage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/random-image" element={<RandomImage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
